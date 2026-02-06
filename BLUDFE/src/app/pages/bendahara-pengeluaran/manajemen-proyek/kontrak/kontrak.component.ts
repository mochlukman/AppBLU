import { Component, OnDestroy, OnInit,SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { IKontrak } from 'src/app/core/interface/ikontrak';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { KontrakService } from 'src/app/core/services/kontrak.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { FormKontrakComponent } from './form-kontrak/form-kontrak.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import {GlobalService} from 'src/app/core/services/global.service';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-kontrak',
  templateUrl: './kontrak.component.html',
  styleUrls: ['./kontrak.component.scss']
})
export class KontrakComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IKontrak[] = [];
  totalRecords: number = 0;
  dataSelected: IKontrak = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(FormKontrakComponent, {static: true}) Form: FormKontrakComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  formFilter: FormGroup;
  title: string = '';
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: KontrakService,
    private notif: NotifService,
    private global: GlobalService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.global._title.subscribe((s) => this.title = s);
    this.service._kontrakSelected.subscribe((e) => {this.dataSelected = e})
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiKeg = {kode: '', nama: ''};
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
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idkeg: [0, [Validators.required, Validators.min(1)]],
      kdtahap: '321'
    });
    this.initialForm = this.formFilter.value;
  }
  
  ngOnInit() {
  }
  callbackDetail(e: any){
    if(e.added || e.edited){
        this.listdata.map((m: any) => {
          if(m.idkontrak == e.data.idkontrak){
            m.nilai = e.data.totalNilai;
          }
          return m;
        })
    }
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }

  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idkeg: 0
    });
    this.listdata = [];
    this.dataSelected = null;
    this.listdata = [];
    this.uiKeg = {kode: '', nama: ''};
    this.kegSelected = null;
    if (this.dt) this.dt.reset();
  }
  lookKegiatan(){
    if(this.unitSelected){
      this.Kegiatan.title = 'Pilih Sub Kegiatan';
      this.Kegiatan.get(this.formFilter.value.idunit, this.formFilter.value.kdtahap, false, 2); //parameter ke 4 = jnskeg, Non Pegawai SKPD
      this.Kegiatan.showThis = true;
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
    this.formFilter.patchValue({
      idkeg: this.kegSelected.data_id
    });
    if (this.dt) this.dt.reset();
  }

  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if (this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idkontrak === e.data.idkontrak);
      this.listdata = this.listdata.filter(f => f.idkontrak != e.data.idkontrak);
      this.listdata.splice(index, 0, e.data);
      if (this.dt) this.dt.reset();
    }
  }

 gets(event: LazyLoadEvent) {
      if (this.formFilter.valid) {
      this.loading = true;
      this.listdata = [];
      this.totalRecords = 0;
      this.dataSelected = null;
      const params = {
        'Start': event.first,
        'Rows': event.rows,
        'GlobalFilter': event.globalFilter ? event.globalFilter : '',
        'SortField': event.sortField,
        'SortOrder': event.sortOrder,
        'Parameters.Idunit': this.formFilter.value.idunit,
        'Parameters.Idkeg': this.formFilter.value.idkeg || 0,
        'Parameters.Idphk3':  0 
      };

       this.service.paging(params).subscribe(resp => {
         if (resp.totalrecords > 0) {
           this.totalRecords = resp.totalrecords;
           this.listdata = resp.data;
         } else {
           this.notif.info('Data Tidak Tersedia');
         }
         this.loading = false;
       }, error => {
         this.loading = false;
         if (Array.isArray(error.error.error)) {
           for (var i = 0; i < error.error.error.length; i++) {
             this.notif.error(error.error.error[i]);
           }
         } else {
           this.notif.error(error.error);
         }
       });
    }
   }
  add(){
    if(this.unitSelected.hasOwnProperty('idunit')){
      this.Form.forms.patchValue({
        idunit: this.unitSelected.idunit,
        idkeg: this.kegSelected.data_id
      });
      this.Form.title = 'Tambah';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  update(e: IKontrak){
    this.Form.forms.patchValue({
      idkontrak : e.idkontrak,
      idunit : e.idunit,
      nokontrak : e.nokontrak,
      idphk3 : e.idphk3,
      idkeg : e.idkeg,
      tglkontrak : e.tglkontrak !== null ? new Date(e.tglkontrak) : new Date(),
      tglakhirkontrak : e.tglakhirkontrak !== null ? new Date(e.tglakhirkontrak) : new Date(),
      uraian : e.uraian,
      nilai : e.nilai,
    });
    if(e.idphk3Navigation){
      this.Form.uiPhk3 = {kode: e.idphk3Navigation.nmphk3, nama: e.idphk3Navigation.nminst};
    } else {
    this.Form.uiPhk3 = { kode: '', nama: '' }; // reset jika null
  }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataKlick(e: IKontrak){
		this.service.setKontrakSelected(e);
	}
  delete(e: IKontrak){
    this.notif.confir({
			message: `${e.nokontrak} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idkontrak).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idkontrak !== e.idkontrak);
              this.listdata.sort((a,b) =>  (a.nokontrak.trim() > b.nokontrak.trim() ? 1 : -1));
              this.notif.success('Data berhasil dihapus');
              this.dt.reset();
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
  ngOnDestroy(): void {
    if(this.formFilter) {
    this.formFilter.reset(this.initialForm);
    }
		this.uiUnit = { kode: '', nama: '' };
		this.uiKeg = { kode: '', nama: '' };
		this.unitSelected = null;
    this.kegSelected = null;
    this.listdata = [];
    this.dataSelected = null;
    this.totalRecords = 0;
		this.service.setKontrakSelected(null);
  }
}
