import { Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {IDisplayGlobal, ILookupTree} from 'src/app/core/interface/iglobal';
import {IDaftunit} from 'src/app/core/interface/idaftunit';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {ITagihan} from 'src/app/core/interface/itagihan';
import {ReportService } from 'src/app/core/services/report.service';
import {LookDaftunitDpaComponent} from 'src/app/shared/lookups/look-daftunit-dpa/look-daftunit-dpa.component';
import {LookDpakegiatanComponent} from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import {Subscription} from 'rxjs';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {TagihanService} from 'src/app/core/services/tagihan.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {DaftunitService } from 'src/app/core/services/daftunit.service';
import {LazyLoadEvent} from 'primeng/api';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import {
  TagihanPengesahanFormComponent
} from 'src/app/pages/bendahara-pengeluaran/manajemen-proyek/tagihan/tagihan-pengesahan/tagihan-pengesahan-form/tagihan-pengesahan-form.component';
import _ from 'lodash';

@Component({
  selector: 'app-tagihan-pengesahan',
  templateUrl: './tagihan-pengesahan.component.html',
  styleUrls: ['./tagihan-pengesahan.component.scss']
})
export class TagihanPengesahanComponent implements OnInit, OnDestroy {
  @Input() tabIndex: number = 1;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  tagihanSelected: ITagihan;
  userInfo: ITokenClaim;
  loading: boolean; 
  listdata: ITagihan[] = [];
  totalRecords: number = 0;
  dataSelected: ITagihan = null;
  @ViewChild(LookDaftunitDpaComponent, {static: true}) Daftunit : LookDaftunitDpaComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(TagihanPengesahanFormComponent, {static: true}) Form: TagihanPengesahanFormComponent;
    @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  sub_tagihan: Subscription;
  indexSubs : Subscription;
  kdstatus: string = '71,79';
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: TagihanService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService,
    private reportService: ReportService,
  ) {
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
      idkeg: [0, [Validators.required, Validators.min(1)]]
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
    this.kegSelected = null;
    this.uiKeg = {kode: '', nama: ''};
    if (this.dt) this.dt.reset();
  }

  lookKegiatan(){
    if(this.unitSelected.hasOwnProperty('idunit')){
      this.Kegiatan.title = 'Pilih Kegiatan';
      this.Kegiatan.get(this.unitSelected.idunit, '321');
      this.Kegiatan.showThis = true;
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
  callback(e: any) {
      if (e.added) {
        if (this.dt) this.dt.reset();
      } else if(e.edited){
        this.listdata.splice(this.listdata.findIndex(i => i.idtagihan === e.data.idtagihan), 1, e.data);
      }
      this.dataSelected = null;
    }
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
            'SortField': event.sortField,
            'SortOrder': event.sortOrder,
            'Parameters.Idunit': this.formFilter.value.idunit,
            'Parameters.Idkeg': this.formFilter.value.idkeg || 0
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
  /*getDatas(){
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      const params = {
        'Idunit': this.unitSelected.idunit,
        'Idkeg': this.kegSelected.data_id,
        'Kdstatus': this.kdstatus
      };
      this.service.gets(params)
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
      this.notif.warning('Pilih SKPD');
    }
  }*/
  update(e: ITagihan){
    this.Form.forms.patchValue({
      idtagihan : e.idtagihan,
      idunit :  e.idunit,
      idkeg :  e.idkeg,
      notagihan : e.notagihan,
      tgltagihan : e.tgltagihan != null ? new Date(e.tgltagihan) : new Date(),
      idkontrak :  e.idkontrak,
      uraiantagihan :  e.uraiantagihan,
      kdstatus :  e.kdstatus,
      tglvalid: e.tglvalid ? new Date(e.tglvalid) : null,
      valid: e.valid
    });
    if(e.idkontrakNavigation){
      this.Form.kontrakSelected = e.idkontrakNavigation;
      this.Form.uiKontrak = {kode: e.idkontrakNavigation.nokontrak, nama: e.idkontrakNavigation.uraian};
    }
    this.Form.title = 'Pengesahan Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataKlick(e: ITagihan){
    this.dataSelected = e;
  }
  delete(e: ITagihan){
    let postBody = _.cloneDeep(e);
    postBody.valid = null;
    postBody.tglvalid = null;
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

  print(e: ITagihan){
      this.tagihanSelected = e;
      this.showTanggal.useTgl = true;
      this.showTanggal.useHal = true;
      this.showTanggal.showThis = true;
    }
    callBackTanggal(e: any){
      let parameterReport = {
        Type: 1,
        FileName: 'BAST.rpt',
        Params: {
          '@idunit': this.unitSelected.idunit,
          '@noTagihan' : this.tagihanSelected.notagihan,
        }
      }; 
      this.reportService.execPrint(parameterReport).subscribe((resp) => {
        this.reportService.extractData(resp, 1, `laporan_${this.tagihanSelected.notagihan}`);
      });
    }

  ngOnDestroy(): void {
     if(this.formFilter) {
    this.formFilter.reset(this.initialForm);
    }
    this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = { kode: '', nama: '' };
    this.unitSelected = null;
    this.kegSelected = null
    this.service.setTagihanSelected(null);
    if (this.indexSubs) this.indexSubs.unsubscribe();
    if (this.sub_tagihan) this.sub_tagihan.unsubscribe();
    this.listdata = [];
    this.dataSelected = null;
    this.totalRecords = 0;
  }
}
