import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SpmService } from 'src/app/core/services/spm.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { SpmLsNonpegawaiVerifikasiFormComponent } from './spm-ls-nonpegawai-verifikasi-form/spm-ls-nonpegawai-verifikasi-form.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { ReportService } from 'src/app/core/services/report.service';
import {LazyLoadEvent} from 'primeng/api';


@Component({
  selector: 'app-spm-ls-nonpegawai-verifikasi',
  templateUrl: './spm-ls-nonpegawai-verifikasi.component.html',
  styleUrls: ['./spm-ls-nonpegawai-verifikasi.component.scss']
})
export class SpmLsNonpegawaiVerifikasiComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit; 
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_rek: boolean;
  listdata: ISpm[] = [];
  totalRecords: number = 0;
  dataSelected: ISpm = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild(SpmLsNonpegawaiVerifikasiFormComponent, {static: true}) Form : SpmLsNonpegawaiVerifikasiFormComponent;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  @ViewChild('dt',{static:false}) dt: any;
  spmSelected: ISpm;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: SpmService,
    private notif: NotifService,
    private unitService: DaftunitService,
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiKeg = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdstatus: '24',
      idxkode: 2,
      kdtahap: '321',
      idkeg: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  /*ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 1){
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
  }*/

    ngOnChanges(changes: SimpleChanges): void {
      if(this.tabIndex == 1){
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

  /*callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idkeg: 0
    });
    this.listdata = [];
    this.dataSelected = null;
    this.kegSelected = null;
    this.uiKeg = {kode: '', nama: ''};
    this.get();
  }*/
  lookKegiatan(){
    if(this.unitSelected){
      this.Kegiatan.title = 'Pilih Sub Kegiatan';
      this.Kegiatan.get(this.unitSelected.idunit, '321', false, 2); //parameter ke 4 = jnskeg, Non Pegawai SKPD
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
  /*callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
    this.formFilter.patchValue({
      idkeg: this.kegSelected.data_id
    });
    this.get();
  }*/

    gets(event: LazyLoadEvent) {
    if (this.formFilter.valid && this.tabIndex == 1) {
      this.loading = true;
      this.listdata = [];
      this.totalRecords = 0;
      this.dataSelected = null;
      const params = {
        'Start': event.first,
        'Rows': event.rows,
        'GlobalFilter': event.globalFilter ? event.globalFilter : '',
        'SortField': event.sortField ? event.sortField : null,
        'SortOrder': event.sortOrder ? event.sortOrder : 1,
    /*gets(event: LazyLoadEvent) {
      console.log(event.globalFilter);
      if (this.formFilter.valid && this.tabIndex == 1) {
        this.loading = true;
        this.listdata = [];
        this.totalRecords = 0;
        this.dataSelected = null;
        const params = {
          'Start': event.first,
          'Rows': event.rows,
          'GlobalFilter': event.globalFilter ? event.globalFilter : '',
          'SortField': event.sortField,
          'SortOrder': event.sortOrder,*/
          'Parameters.Idunit': this.formFilter.value.idunit,
          'Parameters.Kdstatus': this.formFilter.value.kdstatus,
          'Parameters.Idxkode': this.formFilter.value.idxkode,
          'Parameters.Idbend': 0,
          'Parameters.Idkeg': this.formFilter.value.idkeg
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
    /*callback(e: any){
      if(e.added){
        this.listdata.push(e.data);
        if (this.dt) this.dt.reset();
      } else if(e.edited){
        let index = this.listdata.findIndex(f => f.idspm === e.data.idspm);
        this.listdata = this.listdata.filter(f => f.idspm != e.data.idspm);
        this.listdata.splice(index, 0, e.data);
        if (this.dt) this.dt.reset();
      }
    }*/
callback(e: any){
    if(e.added || e.edited){
      if (this.dt) {
        this.gets({ first: this.dt.first, rows: this.dt.rows });
      }
    }
  }
  /*get(){
    if(this.formFilter.valid && this.tabIndex == 1){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._idkeg = this.formFilter.value.idkeg;
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
  }*/

  /*callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspm === e.data.idspm);
      this.listdata = this.listdata.filter(f => f.idspm != e.data.idspm);
      this.listdata.splice(index, 0, e.data);
    }
  }*/

  print(e: ISpm){
    this.spmSelected = e;
    this.showTanggal.useTgl = true;
		this.showTanggal.useHal = true;
		this.showTanggal.showThis = true;
  }
  callBackTanggal(e: any){
    let parameterReport = {
      Type: 1,
      FileName: 'sopd.rpt',
      Params: { 
        	'@idunit': this.unitSelected.idunit,
          '@nospm' : this.spmSelected.nospm,
          '@kdtahap': '321',
      }
    };
    this.reportService.execPrint(parameterReport).subscribe((resp) => {
      this.reportService.extractData(resp, 1, `laporan_${this.spmSelected.nospm}`);
    });
	}

  update(e: ISpm){
    this.Form.forms.patchValue({
      idspm: e.idspm,
      idspp : e.idspp,
      idunit : e.idunit,
      nospm : e.nospm,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      keperluan : e.keperluan,
      penolakan : e.penolakan,
      idphk3:  e.idphk3,
      idkontrak: e.idkontrak,
      tglspm : e.tglspm != null ? new Date(e.tglspm) : '',
      tglvalid : e.tglvalid !== null ? new Date(e.tglvalid) : new Date(),
      valid: e.valid,
      idkeg: e.idkeg,
      validasi: e.validasi
    });
    if(e.idsppNavigation){
      this.Form.uiSpp = {kode: e.idsppNavigation.nospp, nama: e.idsppNavigation.tglspp !== null ? new Date(e.idsppNavigation.tglspp).toLocaleDateString('en-US') : ''};
      this.Form.sppSelected = e.idsppNavigation;
      this.Form.forms.patchValue({
        nmphk3: e.idphk3Navigation ? e.idphk3Navigation.nmphk3 : '',
        nminst: e.idphk3Navigation ? e.idphk3Navigation.nminst : '',
        nokontrak: e.idkontrakNavigation ? e.idkontrakNavigation.nokontrak : ''
      });
    }
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip,
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Pengesahan Data';
    this.Form.mode = 'edit';
    this.Form.isstatus = e.status;
    this.Form.showThis = true;
  }
  delete(e: ISpm){
    let postBody = {
      idspm: e.idspm,
      noreg: e.noreg,
      nospm: e.nospm,
      kdstatus: e.kdstatus,
      tglspm: e.tglspm,
      tglvalid: null,
      valid: null,
      validasi: ''
    };
    this.notif.confir({
      message: `Batalkan Pengesahan ?`,
      accept: () => {
        this.service.pengesahan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.callback({
                edited: true,
                data: resp.body
              });
              this.notif.success('Pengesahan Berhasil Dibatalkan');
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
    if(this.kegSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Sub Kegiatan');
    }
	}
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = {kode: '', nama: ''};
		this.unitSelected = null;
		this.dataSelected = null;
    this.kegSelected = null;
    //his.formFilter.reset(this.initialForm);
    if(this.formFilter) this.formFilter.reset(this.initialForm);
    this.totalRecords = 0;
  }
}
