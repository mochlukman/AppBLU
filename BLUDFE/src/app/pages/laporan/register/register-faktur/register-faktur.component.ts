import { Ibend } from 'src/app/core/interface/ibend';
import { ReportService } from 'src/app/core/services/report.service';
import { MenuItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { indoKalender } from 'src/app/core/local';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import {DaftunitService} from 'src/app/core/services/daftunit.service';

@Component({
  selector: 'app-register-faktur',
  templateUrl: './register-faktur.component.html',
  styleUrls: ['./register-faktur.component.scss']
})
export class RegisterFakturComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  indoKalender: any;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  parameterReport: IReportParameter;
  typeDocument: number;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  tglAwal: string;
  tglAkhir: string;
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
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }

  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.unitSelected.idunit, '02'); //01 = jnsbend, bendahara pengeluaran
      this.Bendahara.showThis = true;
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callBackBendahara(e: Ibend){
    this.bendSelected = e;
    this.uiBend = {
      kode: this.bendSelected.idpegNavigation.nip,
      nama: this.bendSelected.idpegNavigation.nama + ',' + this.bendSelected.jnsbendNavigation.jnsbend.trim() + ' - ' + this.bendSelected.jnsbendNavigation.uraibend.trim()
    };
  }
  callBackTanggal(e: any){
    if(e.cetak){
      if (!this.unitSelected) {
        this.notif.warning('SKPD harus dipilih');
      }
      else {
        this.loading_post = true;
        this.parameterReport = {
          Type: this.typeDocument,
          FileName: 'Daftfaktur.rpt',
          Params: {

            '@idUnit': this.unitSelected.idunit,
            '@Awal': (this.tglAwal !== null || this.tglAwal != '') ? new Date(this.tglAwal).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
            '@Akhir': (this.tglAkhir !== null || this.tglAkhir != '') ? new Date(this.tglAkhir).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
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
    this.tglAwal = '';
    this.tglAkhir = '';
  }
}
