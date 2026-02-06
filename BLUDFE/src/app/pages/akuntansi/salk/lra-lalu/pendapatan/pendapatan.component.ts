import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IDisplayGlobal} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LookDaftunitComponent} from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {GlobalService} from 'src/app/core/services/global.service';
import {DaftunitService} from 'src/app/core/services/daftunit.service';
import {PendapatanFormComponent} from 'src/app/pages/akuntansi/salk/lra-lalu/pendapatan/pendapatan-form/pendapatan-form.component';
import {SaldoawallraService} from 'src/app/core/services/saldoawallra.service';

@Component({
  selector: 'app-pendapatan',
  templateUrl: './pendapatan.component.html',
  styleUrls: ['./pendapatan.component.scss']
})
export class PendapatanComponent implements OnInit, OnDestroy {
  title: string = '';
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  formFilter: FormGroup;
  initialForm: any;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild(PendapatanFormComponent, { static: true }) Form: PendapatanFormComponent;
  @ViewChild('dt', { static: false }) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: SaldoawallraService,
    private notif: NotifService,
    private global: GlobalService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = { kode: '', nama: '' };
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idjnsakun: 4
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
      idunit: this.formFilter.value.idunit,
      idjnsakun: this.formFilter.value.idjnsakun
    });
    this.Form.showThis = true;
  }
  update(e: any){
    this.Form.forms.patchValue({
      idsaldo: e.idsaldo,
      idunit: e.idunit,
      idrek: e.idrek,
      idjnsakun: e.idjnsakun,
      nilai: e.nilai,
      stvalid: e.stvalid
    });
    if(e.idrekNavigation){
      this.Form.uiRek = {kode: e.idrekNavigation.kdper, nama: e.idrekNavigation.nmper};
      this.Form.rekSelected = e.idrekNavigation;
    }
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: any) {
    this.notif.confir({
      message: `${e.idrekNavigation.kdper.trim()} - ${e.idrekNavigation.nmper.trim()} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idsaldo).subscribe(
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
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
  }
}
