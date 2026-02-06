import { ITagihan } from 'src/app/core/interface/itagihan';
import { IPegawai } from 'src/app/core/interface/ipegawai';
import { ReportService } from 'src/app/core/services/report.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal,ILookupTree } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { LookTagihanComponent } from 'src/app/shared/lookups/look-tagihan/look-tagihan.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookMkegiatanByKegunitComponent } from 'src/app/shared/lookups/look-mkegiatan-by-kegunit/look-mkegiatan-by-kegunit.component';
import {LookDpakegiatanComponent} from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';

@Component({
  selector: 'app-dok-bast',
  templateUrl: './dok-bast.component.html',
  styleUrls: ['./dok-bast.component.scss']
})
export class DokBastComponent  implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiTagihan: IDisplayGlobal;
  unitSelected: IDaftunit;
  kegSelected: ILookupTree;
  uiKeg: IDisplayGlobal;
  statusSelected: any;
  optionStatus: SelectItem[];
  tagihanSelected: ITagihan;
  pegawaiSelected: IPegawai;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  optionTahap: SelectItem[];
  parameterReport: IReportParameter;
  typeDocument: number;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookTagihanComponent,{static: true}) Tagihan : LookTagihanComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(

      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
      private unitService: DaftunitService
  ) {
    this.userInfo=this.authService.getTokenInfo();
    if (this.userInfo.Idunit !== 0) {
      this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
        this.callBackDaftunit(resp);
      }, error  => {
        this.loading = false;
        if (Array.isArray(error.error.error)){
          for(let i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
      this.uiUnit={kode: '', nama: '' };
      this.uiKeg={kode: '', nama: '' };
      this.uiTagihan={kode: '', nama: '' };
      this.itemPrints = [
        {
          label: 'PDF',
          icon: 'fa fa-file-pdf-o',
          command: () => {
            this.cetak(1);
          }
        },
        {
          label: 'WORD',
          icon: 'fa fa-file-word-o',
          command: () => {
            this.cetak(2);
          }
        },
        {
          label: 'EXCEL',
          icon: 'fa fa-file-excel-o',
          command: () => {
            this.cetak(3);
          }
        }
      ];

  }

  ngOnInit() {

  }

  lookKegiatan(){
    if(this.unitSelected){
      this.Kegiatan.title = 'Pilih Kegiatan';
      this.Kegiatan.get(this.unitSelected.idunit, '321');
      this.Kegiatan.showThis = true;
    } else {
      this.notif.warning('Pilih SKPD');
    }

  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
  }

  LookTagihan(){
    if(this.unitSelected){
    this.Tagihan.title='Pilih Nomor Tagihan';
      const params = {
        'Idunit': this.unitSelected.idunit,
        'Idkeg': this.kegSelected.data_id
      };
    this.Tagihan.gets(params);
    this.Tagihan.showThis=true;
      } else {
        this.notif.warning('Pilih Unit Organisasi');
      }
    }
  callBackTagihan(e: ITagihan){
    this.tagihanSelected = e;
    this.uiTagihan = {kode: e.notagihan, nama: e.tgltagihan !== null ? new Date(e.tgltagihan).toLocaleDateString('en-US') : ''}
  }

  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;

    this.uiTagihan = { kode: '', nama: '' };
    this.tagihanSelected=undefined;

  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }

  callBackTanggal(e: any){
    if(e.cetak){
      if (!this.unitSelected) {
        this.notif.warning('SKPD harus dipilih');
      } else if (!this.tagihanSelected) {
        this.notif.warning('Nomor Tagihan harus dipilih');
      }
      else {
        this.loading_post = true;
        this.parameterReport = {
          Type: this.typeDocument,
          FileName: 'BAST.rpt',
          Params: {

            '@idunit': this.unitSelected.idunit,
            '@noTagihan' : this.tagihanSelected.notagihan,
            //'@tanggal': e.TGL,
            //'@hal':e.halaman
          }
        };
        this.reportService.execPrint(this.parameterReport).subscribe((resp) => {
          this.loading_post = false;
          this.reportService.extractData(resp, this.parameterReport.Type, this.parameterReport.FileName);
        });
      }
    }
  }
  cetak(type: number) {
    this.typeDocument = type;
    this.showTanggal.useTgl = true;
    this.showTanggal.useHal = true;
    this.showTanggal.showThis = true;
  }
  ngOnDestroy() {
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.uiTagihan = { kode: '', nama: '' };
    this.tagihanSelected = null;

  }

}

