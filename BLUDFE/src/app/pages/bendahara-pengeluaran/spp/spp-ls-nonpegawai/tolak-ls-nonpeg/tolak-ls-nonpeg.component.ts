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
import { TolakLsNonpegCheckComponent } from './tolak-ls-nonpeg-check/tolak-ls-nonpeg-check.component';
import { TolakLsNonpegFormComponent } from './tolak-ls-nonpeg-form/tolak-ls-nonpeg-form.component';
import { LazyLoadEvent } from 'primeng/api/primeng-api';

@Component({
  selector: 'app-tolak-ls-nonpeg',
  templateUrl: './tolak-ls-nonpeg.component.html',
  styleUrls: ['./tolak-ls-nonpeg.component.scss']
})
export class TolakLsNonpegComponent implements OnInit, OnChanges, OnDestroy {
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
  @ViewChild(TolakLsNonpegFormComponent, {static: true}) Form : TolakLsNonpegFormComponent;
  @ViewChild(TolakLsNonpegCheckComponent, {static: true}) Checks: TolakLsNonpegCheckComponent;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: SppService,
    private notif: NotifService,
    private stattrsService: StattrsService,
    private fb: FormBuilder,
    private unitService: DaftunitService
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
    console.log(event.globalFilter);
    if (this.formFilter.valid && this.tabIndex == 2) {
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
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspp === e.data.idspp);
      this.listdata = this.listdata.filter(f => f.idspp != e.data.idspp);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
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
      nilaiup: e.nilaiup,
      idkeg: this.kegSelected ? this.kegSelected.data_id : 0,
      status : e.status,
      tglaprove : e.tglaprove !== null ? new Date(e.tglaprove) : new Date(),
      verifikasi: e.verifikasi
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
    this.stattrsService.get(e.kdstatus).subscribe(resp => {
      this.Form.nmstatus = resp.lblstatus.trim();
      this.Form.title = 'Approval Data';
      this.Form.mode = 'edit';
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
    let postBody = {
      idspp: e.idspp,
      nospp: e.nospp,
      kdstatus: e.kdstatus,
      idbend: e.idbend,
      tglspp: e.tglspp,
      tglvalid: null,
      verifikasi: '',
      valid: null
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
  dataKlick(e: ISpp){
		this.dataSelected = e;
	}
  lookCheck(e: ISpp){
    this.Checks.title = 'Check List Dokumen';
    this.Checks._idspp = e.idspp;
    this.Checks._idxkode = e.idxkode;
    this.Checks.showThis = true;
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
