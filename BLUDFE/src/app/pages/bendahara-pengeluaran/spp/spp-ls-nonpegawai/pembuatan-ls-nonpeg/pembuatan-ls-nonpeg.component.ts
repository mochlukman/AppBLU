import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SppService } from 'src/app/core/services/spp.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { LookTrackingDataComponent } from 'src/app/shared/lookups/look-tracking-data/look-tracking-data.component';
import { FormSppLsNonpegawaiComponent } from '../form-spp-ls-nonpegawai/form-spp-ls-nonpegawai.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { ReportService } from 'src/app/core/services/report.service';
import {LazyLoadEvent} from 'primeng/api';

@Component({
  selector: 'app-pembuatan-ls-nonpeg',
  templateUrl: './pembuatan-ls-nonpeg.component.html',
  styleUrls: ['./pembuatan-ls-nonpeg.component.scss']
})
export class PembuatanLsNonpegComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_rek: boolean;
  listdata: ISpp[] = [];
  totalRecords: number = 0;
  dataSelected: ISpp = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild(FormSppLsNonpegawaiComponent, {static: true}) Form : FormSppLsNonpegawaiComponent;
  @ViewChild(LookTrackingDataComponent, {static: true}) Tracking : LookTrackingDataComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  sppSelected: ISpp;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: SppService,
    private notif: NotifService,
    private stattrsService: StattrsService,
    private fb: FormBuilder,
    private unitService: DaftunitService, 
    private reportService: ReportService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiKeg = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdstatus: '24',
      kdtahap: '321',
      idxkode: 2,
      idkeg: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
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
  gets(event: LazyLoadEvent) {
    if (this.formFilter.valid && this.tabIndex == 0) {
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
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if (this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspp === e.data.idspp);
      this.listdata = this.listdata.filter(f => f.idspp != e.data.idspp);
      this.listdata.splice(index, 0, e.data);
      if (this.dt) this.dt.reset();
    }
  }
    
  add(){
    if(this.unitSelected){
      this.service.getNoreg(this.formFilter.value.idunit)
        .subscribe(resp => {
          if(resp.noreg){
            let noreg =  resp.noreg;
            this.stattrsService.get(this.formFilter.value.kdstatus)
            .subscribe(resp => {
              this.Form.forms.patchValue({
                idunit : this.formFilter.value.idunit,
                kdstatus : this.formFilter.value.kdstatus,
                idxkode : this.formFilter.value.idxkode,
                nospp: `${noreg}/S-PPD-${resp.lblstatus}/${this.unitSelected.kdunit}/${this.userInfo.NmTahun}`,
                noreg: noreg,
                idkeg: this.kegSelected.data_id
              });
              this.Form.nmstatus = resp.lblstatus.trim();
              this.Form.title = 'Tambah';
              this.Form.mode = 'add';
              this.Form.showThis = true;
            },(error) => {
              if(Array.isArray(error.error.error)){
                for(var i = 0; i < error.error.error.length; i++){
                  this.notif.error(error.error.error[i]);
                }
              } else {
                this.notif.error(error.error);
              }
            });
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

    }
  }
  print(e: ISpp){
    this.sppSelected = e;
    this.showTanggal.useTgl = true;
		this.showTanggal.useHal = true;
		this.showTanggal.showThis = true;
  }
  callBackTanggal(e: any){
    let parameterReport = {
      Type: 1,
      FileName: 'sppd.rpt',
      Params: {
        '@idunit': this.unitSelected.idunit,
        '@nospp' : this.sppSelected.nospp,
        '@kdtahap': '321',
        '@nip': '',
      }
    }; 
    this.reportService.execPrint(parameterReport).subscribe((resp) => {
      this.reportService.extractData(resp, 1, `laporan_${this.sppSelected.nospp}`);
    });
	}
  update(e: ISpp){
    this.Form.forms.patchValue({
      idspp : e.idspp,
      idunit : e.idunit,
      nospp : e.nospp,
      kdstatus : e.kdstatus,
      idbulan : e.idbulan,
      idbend : e.idbend,
      idspd : e.idspd,
      idphk3 : e.idphk3,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      idkontrak : e.idkontrak,
      keperluan : e.keperluan,
      tglspp : e.tglspp !== null ? new Date(e.tglspp) : new Date(),
      status : e.status,
      nilaiup: e.nilaiup,
      idkeg: this.kegSelected ? this.kegSelected.data_id : 0
    });
    if(e.idspdNavigation){
      this.Form.uiSpd = {kode: e.idspdNavigation.nospd, nama: e.idspdNavigation.tglspd !== null ? new Date(e.idspdNavigation.tglspd).toLocaleDateString('en-US') : ''};
      this.Form.spdSelected = e.idspdNavigation;
    }
    if(e.idbendNavigation){
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip,
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      }
      this.Form.bendSelected = e.idbendNavigation;
    }
    if(e.idkontrakNavigation){
      this.Form.kontrakSelected = e.idkontrakNavigation;
      this.Form.uiKontrak = {kode: e.idkontrakNavigation.nokontrak, nama: e.idkontrakNavigation.uraian};
    }
    if(e.idphk3Navigation){
      this.Form.phk3Selected = e.idphk3Navigation;
      this.Form.uiPhk3 = {kode: e.idphk3Navigation.nmphk3, nama: e.idphk3Navigation.nminst};
    }
    this.stattrsService.get(e.kdstatus).subscribe(resp => {
      this.Form.nmstatus = resp.lblstatus.trim();
      this.Form.title = 'Ubah';
      this.Form.mode = 'edit';
      this.Form.isvalid = e.valid;
      this.Form.showThis = true;
    },(error) => {
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }
  delete(e: ISpp){
    this.notif.confir({
      header: 'Konfirmasi',
      message: `${e.nospp} akan di hapus ?`,
      accept: () => {
        this.service.delete(e.idspp).subscribe(
          () => {
            this.dataSelected = null;
            this.notif.success('Data berhasil dihapus');
            if (this.dt) this.dt.reset();
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
  dataKlick(e: ISpp){
		this.dataSelected = e;
	}
  lookTracking(e: ISpp){
    this.Tracking.title = `Status Data S-PPD : ${e.nospp}`;
    this.Tracking._typedata = 'spp';
    this.Tracking._iddata = e.idspp;
    this.Tracking.showThis = true;
  }
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = { kode: '', nama: '' };
		this.unitSelected = null;
    this.kegSelected = null;
		this.dataSelected = null;
    if(this.formFilter) this.formFilter.reset(this.initialForm);
    this.totalRecords = 0;
  }
}
