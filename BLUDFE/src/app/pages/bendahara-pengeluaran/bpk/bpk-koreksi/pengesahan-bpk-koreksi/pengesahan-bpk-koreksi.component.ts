import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IBpk } from 'src/app/core/interface/ibpk';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkService } from 'src/app/core/services/bpk.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import {DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { PengesahanBpkKoreksiFormComponent } from './pengesahan-bpk-koreksi-form/pengesahan-bpk-koreksi-form.component';

@Component({
  selector: 'app-pengesahan-bpk-koreksi',
  templateUrl: './pengesahan-bpk-koreksi.component.html',
  styleUrls: ['./pengesahan-bpk-koreksi.component.scss']
})
export class PengesahanBpkKoreksiComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IBpk[] = [];
  totalRecords: number = 0;
  dataSelected: IBpk = null;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild(LookDpakegiatanComponent, { static: true }) Kegiatan: LookDpakegiatanComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(PengesahanBpkKoreksiFormComponent, {static: true}) Form: PengesahanBpkKoreksiFormComponent;
  @ViewChild('dt', { static: false }) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: BpkService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode : '', nama : ''};
    this.uiKeg = {kode : '', nama : ''};
    this.uiBend = {kode : '', nama : ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdstatus: ['20', Validators.required],
      idxkode: [2, Validators.required],
      idkeg: [0, [Validators.required, Validators.min(1)]],
      idbend: [0, [Validators.required, Validators.min(1)]],
      kdtahap: '321'
    });
    this.initialForm = this.formFilter.value;
  }
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
      idkeg: 0,
      idbend: 0
    });
    this.listdata = [];
    this.dataSelected = null;
    this.kegSelected = null;
    this.uiKeg = {kode: '', nama: ''};
    this.bendSelected = null;
    this.uiBend = {kode : '', nama : ''};
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
      idkeg: this.kegSelected.data_id,
      idbend: 0
    });
    this.bendSelected = null;
    this.uiBend = {kode : '', nama : ''};
    if (this.dt) this.dt.reset();
  }
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.formFilter.value.idunit,'02,12');
      this.Bendahara.showThis = true;
    } else {
      this.notif.warning('Pilih Unit');
    }
  }
  callBackBendahara(e: Ibend){
    this.bendSelected = e;
    this.uiBend = {
      kode: this.bendSelected.idpegNavigation.nip,
      nama: this.bendSelected.idpegNavigation.nama + ',' + this.bendSelected.jnsbendNavigation.jnsbend.trim() + ' - ' + this.bendSelected.jnsbendNavigation.uraibend.trim()
    };
    this.formFilter.patchValue({
      idbend: this.bendSelected.idbend
    });
    if (this.dt) this.dt.reset();
  }
  callback(e: any) {
    if (e.added) {
      if (this.dt) this.dt.reset();
    } else if(e.edited){
      this.listdata.splice(this.listdata.findIndex(i => i.idbpk === e.data.idbpk), 1, e.data);
    }
    this.dataSelected = null;
  }
  gets(event: LazyLoadEvent) {
    if (this.formFilter.valid && this.tabIndex == 1) {
      this.loading = true;
      this.listdata = [];
      this.dataSelected = null;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField ? event.sortField : 'nobpk';
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._idkeg = this.formFilter.value.idkeg;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idbend = this.formFilter.value.idbend;
      this.service.paging().subscribe(resp => {
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
  update(e: IBpk){
    this.Form.forms.patchValue({
      idbpk : e.idbpk,
      idkeg: e.idkeg ? e.idkeg : this.formFilter.value.idkeg,
      idbend: e.idbend,
      idunit : e.idunit,
      idphk3 : e.idphk3,
      idtagihan: e.idtagihan,
      nobpk : e.nobpk,
      kdstatus : e.kdstatus,
      idjbayar : e.idjbayar,
      idxkode : e.idxkode,
      tglbpk : e.tglbpk != null ? new Date(e.tglbpk) : null,
      penerima : e.penerima,
      uraibpk : e.uraibpk,
      idjtransfer: e.idjtransfer ? e.idjtransfer : 0,
      tglvalid : e.tglvalid !== null ? new Date(e.tglvalid) : new Date(),
      valid: e.valid,
      verifikasi: e.verifikasi
    });
    if(e.idtagihanNavigation){
      this.Form.uiTagihan = {kode: e.idtagihanNavigation.notagihan, nama: e.idtagihanNavigation.tgltagihan !== null ? new Date(e.idtagihanNavigation.tgltagihan).toLocaleDateString('en-US') : ''};
      this.Form.tagihanSelected = e.idtagihanNavigation;
    }
    if(e.kdstatus.trim() == '23'){
      this.Form.isTU = true;
      this.Form.forms.patchValue({
        idsp2d: e.sp2dbpk.length > 0 ? e.sp2dbpk[0].idsp2d : 0
      });
      if(e.sp2dbpk.length > 0){
        if(e.sp2dbpk[0].idsp2dNavigation){
          this.Form.uiSp2d = {kode: e.sp2dbpk[0].idsp2dNavigation.nosp2d.trim(), nama: e.sp2dbpk[0].idsp2dNavigation.tglsp2d != null ? new Date(e.sp2dbpk[0].idsp2dNavigation.tglsp2d).toLocaleDateString('en-US') : ''};
          this.Form.sp2dSelected = e.sp2dbpk[0].idsp2dNavigation;
        }
      }
    }
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Pengesahan Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IBpk){
    let postBody = {
      idbpk: e.idbpk,
      idunit: e.idunit,
      nobpk: e.nobpk,
      kdstatus: e.kdstatus,
      idjbayar: e.idjbayar,
      idxkode: e.idxkode,
      uraibpk: e.uraibpk,
      tglvalid: null,
      valid: null
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
  dataClick(e: IBpk){
    this.dataSelected = e;
  }
  ngOnDestroy(): void {
    this.formFilter.reset(this.initialForm);
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.uiKeg = { kode: '', nama: '' };
    this.bendSelected = null;
    this.uiBend = { kode: '', nama: '' };
    this.listdata = [];
    this.dataSelected = null;
    this.totalRecords = 0;
  }
}
