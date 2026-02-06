import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {DaftunitService} from 'src/app/core/services/daftunit.service';
import {Sp3bService} from 'src/app/core/services/sp3b.service';
import {Sp3bFormComponent} from 'src/app/pages/akuntansi/pengesahan-pelaporan/sp3b/sp3b-form/sp3b-form.component';

@Component({
  selector: 'app-sp3b',
  templateUrl: './sp3b.component.html',
  styleUrls: ['./sp3b.component.scss']
})
export class Sp3bComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  formFilter: FormGroup;
  initialForm: any;
  dataselected: any;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild(Sp3bFormComponent, { static: true }) Form: Sp3bFormComponent;
  @ViewChild('dt', { static: false }) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: Sp3bService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = { kode: '', nama: '' };
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
    });
    if(this.userInfo.Idunit != 0){
      this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
        this.callBackDaftunit(resp);
      },error => {
        this.loading = false;
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.tabIndex;
    if(this.tabIndex == 0){
      this.uiUnit = { kode: '', nama: '' };
      this.unitSelected = null;
      this.listdata = [];
    }
  }
  ngOnInit() {
  }
  lookDaftunit() {
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit) {
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    this.getDatas();
  }
  getDatas(){
    if(this.unitSelected){
      this.dataselected = null;
      this.listdata = [];
      this.loading = true;
      this.service.gets(this.formFilter.value)
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    } else {
      this.notif.warning('Pilih Unit Oraganisasi');
    }
  }
  callback(e: any) {
    if (e.added || e.edited) {
      this.getDatas();
    }
  }
  add() {
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idunit: this.formFilter.value.idunit
    });
    this.Form.showThis = true;
  }
  delete(e: any) {
    this.notif.confir({
      message: `${e.nosp3b} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idsp3b).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              this.getDatas();
            }
          }, (error) => {
            if (Array.isArray(error.error.error)) {
              for (var i = 0; i < error.error.error.length; i++) {
                this.notif.error(error.error.error[i]);
              }
            } else {
              this.notif.error(error.error);
            }
          });
      },
      reject: () => {
        return false;
      }
    });
  }
  clickdata(data: any){
    this.dataselected = data;
  }
  ngOnDestroy(): void {
    this.dataselected = null;
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
  }
}
