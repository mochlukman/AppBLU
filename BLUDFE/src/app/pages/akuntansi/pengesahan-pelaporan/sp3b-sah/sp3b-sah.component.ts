import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {Sp3bService} from 'src/app/core/services/sp3b.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {DaftunitService} from 'src/app/core/services/daftunit.service';
import {Sp3bFormSahComponent} from 'src/app/pages/akuntansi/pengesahan-pelaporan/sp3b-sah/sp3b-form-sah/sp3b-form-sah.component';
import _ from 'lodash';

@Component({
  selector: 'app-sp3b-sah',
  templateUrl: './sp3b-sah.component.html',
  styleUrls: ['./sp3b-sah.component.scss']
})
export class Sp3bSahComponent implements OnInit, OnDestroy, OnChanges {
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
  @ViewChild(Sp3bFormSahComponent, { static: true }) Form: Sp3bFormSahComponent;
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
    if(this.tabIndex == 1){
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
  update(e: any){
    this.Form.forms.patchValue({
      idsp3b: e.idsp3b,
      idunit: e.idunit,
      nosp3b: e.nosp3b,
      tglsp3b: e.tglsp3b != null ? new Date(e.tglsp3b) : new Date(),
      uraisp3b: e.uraisp3b,
      tglvalid: e.tglvalid ? new Date(e.tglvalid) : null,
      valid: e.valid
    });
    this.Form.title = 'Pengesah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: any) {
    let postBody = _.cloneDeep(e);
    postBody.valid = null;
    postBody.tglvalid = null;
    this.notif.confir({
      message: `Batalkan Pengesahan ${e.nosp3b} ?`,
      accept: () => {
        this.service.pengesahan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Pengesahan Berhasil Dibatalkan');
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

