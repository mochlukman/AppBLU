import { LookDaftrekBykodeComponent } from 'src/app/shared/lookups/look-daftrek-bykode/look-daftrek-bykode.component';
import { IDisplayGlobal,ILookupTree } from 'src/app/core/interface/iglobal';
import { ReportService } from 'src/app/core/services/report.service';
import { TahapService } from 'src/app/core/services/tahap.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { indoKalender } from 'src/app/core/local';
import {DaftunitService} from 'src/app/core/services/daftunit.service';


@Component({
  selector: 'app-utang-rekanan',
  templateUrl: './utang-rekanan.component.html',
  styleUrls: ['./utang-rekanan.component.scss']
})

export class UtangRekananComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  indoKalender: any;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiDaftrek: IDisplayGlobal;
  daftrekSelected: IDaftrekening;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  parameterReport: IReportParameter;
  typeDocument: number;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookDaftrekBykodeComponent, {static: true}) Daftrek : LookDaftrekBykodeComponent;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  tglAwal: string;
  tglAkhir: string;
  constructor(

      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
      private service: TahapService,
      private unitService: DaftunitService
  ) {
    this.userInfo=this.authService.getTokenInfo();
    if (this.userInfo.Idunit !== 0) {
      this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
        this.callBackDaftunit(resp);
      }, error => {
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < error.error.error.length; i++) {
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
      this.uiUnit={kode: '', nama: '' };
      this.uiDaftrek = {kode: '', nama: ''};
      this.indoKalender = indoKalender;
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

  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;

    this.uiDaftrek = { kode: '', nama: '' };
    this.daftrekSelected=undefined;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }
  lookDaftrek(){
    if(this.unitSelected){
      this.Daftrek.title = 'Pilih Rekening';
      this.Daftrek.kode = '2.';
      this.Daftrek.showThis = true;
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callBackDaftrek(e: IDaftrekening){
    this.daftrekSelected = e;
    this.uiDaftrek = {
      kode: e.kdper,
      nama: e.nmper
    };
  }

  callBackTanggal(e: any){
    if(e.cetak){
      if (!this.unitSelected) {
        this.notif.warning('SKPD harus dipilih');
      } else if(!this.daftrekSelected){
        this.notif.warning('Pilih Rekening')
      }
      else {
        this.loading_post = true;
        this.parameterReport = {
          Type: this.typeDocument,
          FileName: 'Daftutang.rpt',
          Params: {
            '@idunit': this.unitSelected.idunit,
            '@idrek': this.daftrekSelected.idrek,
            '@Awal': (this.tglAwal !== null || this.tglAwal != '') ? new Date(this.tglAwal).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
            '@Akhir': (this.tglAkhir !== null || this.tglAkhir != '') ? new Date(this.tglAkhir).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
            //'@tgl': e.TGL,
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
    this.uiDaftrek = { kode: '', nama: '' };
    this.daftrekSelected=undefined;
    this.tglAwal = '';
    this.tglAkhir = '';
  }

}
