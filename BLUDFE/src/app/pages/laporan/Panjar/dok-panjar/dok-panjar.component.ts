import { IPanjar } from 'src/app/core/interface/ipanjar';
import { Ibend } from 'src/app/core/interface/ibend';
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
import { LookPanjarComponent } from 'src/app/shared/lookups/look-panjar/look-panjar.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';

@Component({
  selector: 'app-dok-panjar',
  templateUrl: './dok-panjar.component.html',
  styleUrls: ['./dok-panjar.component.scss']
})
export class DokPanjarComponent  implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiPanjar: IDisplayGlobal;
  panjarSelected: IPanjar;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  statusSelected: any;
  optionStatus: SelectItem[];
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  optionTahap: SelectItem[];
  parameterReport: IReportParameter;
  typeDocument: number;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookPanjarComponent,{static: true}) Panjar : LookPanjarComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
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
      this.uiBend={kode: '', nama: '' };
      this.uiPanjar={kode: '', nama: '' };
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

 lookBendahara(){
     if(this.unitSelected){
       this.Bendahara.title = 'Pilih Bendahara';
       this.Bendahara.gets(this.unitSelected.idunit, '02'); //02 = jnsbend, bendahara pengeluaran
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

  LookPanjar(){
    if(this.unitSelected){
    this.Panjar.title='Pilih Nomor Panjar';
    this.Panjar.getForbku(this.unitSelected.idunit,this.bendSelected.idbend);
    this.Panjar.showThis=true;
      } else {
        this.notif.warning('Pilih Unit Organisasi');
      }
    }
  callBackPanjar(e: IPanjar){
    this.panjarSelected = e;
    //this.uiPanjar = {kode: e.nopanjar, nama: e.tglpanjar !== null ? new Date(e.tglpanjar).toLocaleDateString('en-US') : ''}
    this.uiPanjar = {kode: e.nopanjar, nama: e.uraian};
  }

  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;

    this.uiPanjar = { kode: '', nama: '' };
    this.panjarSelected=undefined;

  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }

  callBackTanggal(e: any){
    if(e.cetak){
      if (!this.unitSelected) {
        this.notif.warning('SKPD harus dipilih');
      } else if (!this.panjarSelected) {
        this.notif.warning('Nomor Panjar harus dipilih');
      }
      else {
        this.loading_post = true;
        this.parameterReport = {
          Type: this.typeDocument,
          FileName: 'Buktipanjar.rpt',
          Params: {

            '@idUnit': this.unitSelected.idunit,
            '@NOPANJAR' : this.panjarSelected.nopanjar,
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
    this.uiPanjar = { kode: '', nama: '' };
    this.panjarSelected = null;

  }

}

