import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Sp2dService } from 'src/app/core/services/sp2d.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { PembiayaanPembuatanFormComponent } from './pembiayaan-pembuatan-form/pembiayaan-pembuatan-form.component';

@Component({
  selector: 'app-pembiayaan-pembuatan',
  templateUrl: './pembiayaan-pembuatan.component.html',
  styleUrls: ['./pembiayaan-pembuatan.component.scss']
})
export class PembiayaanPembuatanComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  totalRecords: number;
  dataSelected: ISp2d = null;
  spmSelected: ISpm;
  formFilter: FormGroup;
  initialForm: any;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(PembiayaanPembuatanFormComponent, {static: true}) Form : PembiayaanPembuatanFormComponent;
  @ViewChild('dt',{static:false}) dt: any;

  constructor(
    private auth: AuthenticationService,
    private service: Sp2dService,
    private notif: NotifService,
    private fb: FormBuilder
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idxkode: [5, Validators.required],
      kdstatus: ['24', Validators.required]
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex != 0){
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
    this.dataSelected = null;
    this.spmSelected = null;
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    if(this.dt) this.dt.reset();
  }
  gets(event: LazyLoadEvent){
    if(this.formFilter.valid){
      this.loading = true;
      this.listdata = [];
      const params = {
        'Start': event.first,
        'Rows': event.rows,
        'GlobalFilter': event.globalFilter ? event.globalFilter : '',
        'SortField': event.sortField,
        'SortOrder': event.sortOrder,
        'Parameters.Idunit': this.formFilter.value.idunit,
        'Parameters.Kdstatus': this.formFilter.value.kdstatus,
        'Parameters.Idxkode': this.formFilter.value.idxkode
      };
      this.service.getPaging(params).subscribe(resp => {
        if(resp.totalrecords > 0){
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
      }, error => {
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
  callback(e: any){
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
    this.dataSelected = null;
  }
  add(){
    if(this.unitSelected){
      this.Form.unitSelected = this.unitSelected;
      this.Form.forms.patchValue({
        idunit : this.unitSelected.idunit,
        kdstatus : '24',
        idxkode : 5
      });
      this.Form.title = 'Tambah SP2D Penerimaan Pembiayaan';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  edit(e: ISp2d){
    this.Form.forms.patchValue({
      idsp2d : e.idsp2d,
      idspm : e.idspm,
      idspd : e.idspd,
      idunit : e.idunit,
      nosp2d : e.nosp2d,
      nospm : e.nospm,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idttd: e.idttd,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      keperluan : e.keperluan,
      penolakan : e.penolakan,
      tglsp2d : e.tglsp2d != null ? new Date(e.tglsp2d) : null,
      tglvalid: e.tglvalid != null ? new Date(e.tglvalid): null
    });
    if(e.idspmNavigation){
      this.Form.uiSpm = {kode: e.idspmNavigation.nospm, nama: e.idspmNavigation.tglspm !== null ? new Date(e.idspmNavigation.tglspm).toLocaleDateString('en-US') : ''};
      this.Form.spmSelected = e.idspmNavigation;
    }
    if(e.idspdNavigation){
      this.Form.forms.patchValue({
        nospd: e.idspdNavigation.nospd,
        tglspd: e.idspdNavigation.tglspd != null ? new Date(e.idspdNavigation.tglspd).toLocaleDateString('en-US') : '',
      });
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.isvalid = e.valid;
    this.Form.showThis = true;
  }
  delete(e: ISp2d){
    this.notif.confir({
			message: `${e.nosp2d} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idsp2d).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              if(this.dt) this.dt.reset();
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
  dataKlick(e: ISp2d){
    this.dataSelected = e;
    if(this.dataSelected.idspmNavigation) this.spmSelected = this.dataSelected.idspmNavigation;
  }
  print(e: ISp2d){}
  ngOnDestroy(): void {
    this.dataSelected = null;
    this.spmSelected = null;
    this.listdata = [];
    this.totalRecords = 0;
    this.unitSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
  }
}
