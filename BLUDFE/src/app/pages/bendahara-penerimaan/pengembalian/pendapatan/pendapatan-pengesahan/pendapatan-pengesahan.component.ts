import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PengembalianMainPageService } from 'src/app/core/services/pengembalian-main-page.service';
import { SpmService } from 'src/app/core/services/spm.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { PendapatanPengesahanFormComponent } from './pendapatan-pengesahan-form/pendapatan-pengesahan-form.component';

@Component({
  selector: 'app-pendapatan-pengesahan',
  templateUrl: './pendapatan-pengesahan.component.html',
  styleUrls: ['./pendapatan-pengesahan.component.scss']
})
export class PendapatanPengesahanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  indexSubs : Subscription;
  userInfo: ITokenClaim;
  loading: boolean;
  formFilter: FormGroup;
  initialForm: any;
  listdata: any[] = [];
  dataSelected: any;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(PendapatanPengesahanFormComponent, {static: true}) Form: PendapatanPengesahanFormComponent;
  constructor(
    private mainService: PengembalianMainPageService,
    private auth: AuthenticationService,
    private notif: NotifService,
    private fb: FormBuilder,
    private service: SpmService,
    private unitService: DaftunitService,
    private stattrsService: StattrsService) { 
      this.formFilter = this.fb.group({
        idunit: [0, [Validators.required, Validators.min(1)]],
        idbend: [0, [Validators.required, Validators.min(1)]],
        kdstatus: ['24'],
        idxkode: 1
      });
      this.initialForm = this.formFilter.value;
      this.userInfo = this.auth.getTokenInfo();
      this.uiUnit = {kode: '', nama: ''};
      this.indexSubs = this.mainService._tabIndex.subscribe(resp => {
        if(resp === 1){}
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
  lookDaftunit(){
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.dataSelected = null;
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idbend: 0
    });
    this.dataSelected = null;
    this.listdata = [];
    this.get();
  }
  get(){
    if(this.unitSelected){
      this.dataSelected = null;
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._idbend = this.formFilter.value.idbend;
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
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callback(e: any){
    if(e.added || e.edited){
      this.get();
    }
  }
  print(e: ISpm){}
  update(e: ISpm){
    this.Form.forms.patchValue({
      idspm: e.idspm,
      idunit : e.idunit,
      nospm : e.nospm,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      keperluan : e.keperluan,
      idphk3:  e.idphk3,
      tglspm : e.tglspm != null ? new Date(e.tglspm) : '',
      tglvalid : e.tglvalid != null ? new Date(e.tglvalid) : '',
      valid: e.valid,
      validasi: e.validasi
    });
    if(e.idphk3Navigation){
      this.Form.uiPhk3 = {kode: e.idphk3Navigation.nmphk3, nama: e.idphk3Navigation.nminst};
      this.Form.phk3Selected = e.idphk3Navigation;
    }
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip, 
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Pengesahan SPM - Pengembalian Pendapatan';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISpm){
    let postBody = {
      idspm: e.idspm,
      idunit : e.idunit,
      nospm : e.nospm,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      keperluan : e.keperluan,
      idphk3:  e.idphk3,
      tglspm : e.tglspm != null ? new Date(e.tglspm) : null,
      tglvalid : null,
      valid: null,
      validasi: null
    }
    this.notif.confir({
			message: `Batalkan Pengesahan Untuk No SPM : ${e.nospm}?`,
			accept: () => {
				this.service.pengesahan(postBody).subscribe(
					(resp) => {
						if (resp.ok) {
              this.get();
              this.notif.success('Pengesahan berhasil dibatalkan');
						}
					}, (error) => {
            if(Array.isArray(error.error.error)){
              for(var i = 0; i < error.error.error.length; i++){
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
    this.unitSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
    this.loading = false;
    this.listdata = [];
    this.dataSelected = null;
  }
}
