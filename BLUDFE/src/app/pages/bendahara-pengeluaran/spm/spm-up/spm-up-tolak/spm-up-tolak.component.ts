import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SpmService } from 'src/app/core/services/spm.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { SpmUpTolakFormComponent } from './spm-up-tolak-form/spm-up-tolak-form.component';

@Component({
  selector: 'app-spm-up-tolak',
  templateUrl: './spm-up-tolak.component.html',
  styleUrls: ['./spm-up-tolak.component.scss']
})
export class SpmUpTolakComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_rek: boolean;
  listdata: ISpm[] = [];
  dataSelected: ISpm = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(SpmUpTolakFormComponent, {static: true}) Form : SpmUpTolakFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: SpmService,
    private notif: NotifService,
    private unitService: DaftunitService,
    private fb: FormBuilder
  ) {
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(0)]],
      kdstatus : '21',
      idxkode : 6,
    });
    this.initialForm = this.formFilter.value;
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 2){
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
    } else {
      this.ngOnDestroy();
    }
  }

  ngOnInit() {
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    this.dataSelected = null;
    this.get();
  }
  get(){
    if(this.formFilter.valid && this.tabIndex == 2){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service.gets()
        .subscribe(resp => {
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
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspp === e.data.idspp);
      this.listdata = this.listdata.filter(f => f.idspp != e.data.idspp);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  update(e: ISpm){
    this.Form.forms.patchValue({
      idspm : e.idspm,
      idspp : e.idspp,
      idunit : e.idunit,
      nospm : e.nospm,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      keperluan : e.keperluan,
      tglspm : e.tglspm != null ? new Date(e.tglspm) : '',
      status : e.status,
      tglaprove : e.tglaprove !== null ? new Date(e.tglaprove) : new Date(),
      verifikasi: e.verifikasi
    });
    if(e.idsppNavigation){
      this.Form.uiSpp = {kode: e.idsppNavigation.nospp, nama: e.idsppNavigation.tglspp !== null ? new Date(e.idsppNavigation.tglspp).toLocaleDateString('en-US') : ''};
      this.Form.sppSelected = e.idsppNavigation;
      this.Form.forms.patchValue({
        nilaiup: new Intl.NumberFormat('ID').format(e.idsppNavigation.nilaiup)
      });
    }
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip,
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Approval Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISpm){
    let postBody = {
      idspm: e.idspm,
      noreg: e.noreg,
      nospm: e.nospm,
      kdstatus: e.kdstatus,
      tglspm: e.tglspm,
      tglaprove: null,
      verifikasi: '',
      status: null
    };
    this.notif.confir({
      message: `Batalkan Approval ?`,
      accept: () => {
        this.service.penolakan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.callback({
                edited: true,
                data: resp.body
              });
              this.notif.success('Approval Berhasil Dibatalkan');
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
  dataKlick(e: ISpm){
		this.dataSelected = e;
	}
  ngOnDestroy(): void{
    this.formFilter.reset(this.initialForm);
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
  }
}
