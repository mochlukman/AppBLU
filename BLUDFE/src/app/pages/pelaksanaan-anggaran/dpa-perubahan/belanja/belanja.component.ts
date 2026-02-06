import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDpa } from 'src/app/core/interface/idpa';
import { IDpar } from 'src/app/core/interface/idpar';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpaService } from 'src/app/core/services/dpa.service';
import { DparService } from 'src/app/core/services/dpar.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitDpaComponent } from 'src/app/shared/lookups/look-daftunit-dpa/look-daftunit-dpa.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { FormDparComponent } from './form-dpar/form-dpar.component';

@Component({
  selector: 'app-belanja',
  templateUrl: './belanja.component.html',
  styleUrls: ['./belanja.component.scss']
})
export class BelanjaComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_sk: boolean;
  loading_rek: boolean;
  listdata: IDpa[] = [];
  totalRecords: number;
  listrek: IDpar[] = [];
  skSelected: IDpa = null;
  rekSelected: IDpar = null;
  @ViewChild(LookDaftunitDpaComponent, {static: true}) Daftunit : LookDaftunitDpaComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild(FormDparComponent, {static: true}) FormDpar : FormDparComponent;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild('dtrek',{static:true}) dtrek: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: DpaService,
    private service_rek: DparService,
    private notif: NotifService,
    private fb: FormBuilder,
    private global: GlobalService,
    private unitService: DaftunitService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiKeg = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: '341',
      idkeg: 0,
      idxkode: 2
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
    this.service_rek._nilaiRek.subscribe(resp => {
      if(this.rekSelected){
        if(this.listrek.length > 0){
          this.listrek.map(m => {
            if(m.iddpar == this.rekSelected.iddpar){
							m.nilai = resp;
						}
						this.dtrek.reset();
          });
        }
			}
    });
  }
  ngOnInit() {
    this.tabIndex = 0;
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
    this.skSelected = null;
    this.rekSelected = null;
    this.uiKeg = {kode: '', nama: ''};
    this.kegSelected = null;
    this.listdata = [];
    this.listrek = [];
    if(this.dt) this.dt.reset();
  }
  lookKegiatan(){
    if(this.unitSelected){
      this.Kegiatan.title = 'Pilih Kegiatan';
      this.Kegiatan.get(this.formFilter.value.idunit, this.formFilter.value.kdtahap);
      this.Kegiatan.showThis = true;
    } else {
      this.notif.warning('Pilih SKPD');
    }

  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
    this.skSelected = null;
    this.rekSelected = null;
    this.formFilter.patchValue({
      idkeg: this.kegSelected.data_id
    });
    if(this.dt) this.dt.reset();
  }
  gets(event: LazyLoadEvent){
    if(this.formFilter.valid){
      this.loading_sk = true;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdtahap = this.formFilter.value.kdtahap;
      this.service.paging().subscribe(resp => {
        this.totalRecords = resp.totalrecords;
        this.listdata = resp.data;
        this.loading_sk = false;
      }, error => {
        this.loading_sk = false;
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
  skKlick(e: IDpa){
    if(this.kegSelected){
      this.skSelected = e;
      this.rekSelected = null;
      this.getRek();
    } else {
      this.notif.info('Pilih Kegiatan');
    }
	}
  getRek(){
    if(this.formFilter.valid && this.kegSelected){
      if(this.dtrek) this.dtrek.reset();
      this.loading_rek = true;
      this.listrek = [];
      this.service_rek.gets(this.skSelected.iddpa, this.formFilter.value.kdtahap, this.formFilter.value.idkeg)
        .subscribe(resp => {
          if(resp.length){
            this.listrek = [...resp]
          } else {
            this.notif.info('Data Rekening Tidak Tersedia');
          }
          this.loading_rek = false;
        }, error => {
          this.loading_rek = false;
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
  callbackRek(e: any){
    if(e.added){
      this.listrek.push(e.data);
    } else if(e.edited){
      let index = this.listrek.findIndex(f => f.iddpar === e.data.iddpar);
      this.listrek = this.listrek.filter(f => f.iddpar != e.data.iddpar);
      this.listrek.splice(index, 0, e.data);
    }
    if(this.dtrek) this.dtrek.reset();
  }
  editRek(e: IDpar){
    this.FormDpar.title = 'Ubah';
    this.FormDpar.mode = 'edit';
    this.FormDpar.forms.patchValue({
      iddpar: e.iddpar,
      iddpa: e.iddpa,
      kdtahap: e.kdtahap,
      idrek: e.idrek,
      idkeg: e.idkeg,
      nilai: e.nilai,
      upGu : e.upGu,
      ls : e.ls,
      tu : e.tu,
    });
    this.FormDpar.showThis = true;
  }
  totalNilai(type: string){
    let total = 0;
		if(this.listrek.length > 0){
      if(type == 'nilai'){
        this.listrek.forEach(f => total += f.nilai);
      } else if(type == 'upgu'){
        this.listrek.forEach(f => total += f.upGu);
      }else if(type == 'ls'){
        this.listrek.forEach(f => total += f.ls);
      }else if(type == 'tu'){
        this.listrek.forEach(f => total += f.tu);
      }
		}
		return total;
  }
  rekKlik(e: IDpar){
    this.rekSelected = e;
  }
  onChangeTab(e: any){
		this.tabIndex = e.index;
	}
  ngOnDestroy(): void {
    this.formFilter.reset(this.initialForm);
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.uiKeg = { kode: '', nama: '' };
		this.unitSelected = null;
    this.kegSelected = null;
		this.skSelected = null;
    this.rekSelected = null;
  }
}
