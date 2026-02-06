import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ReportService } from 'src/app/core/services/report.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import {DaftunitService} from 'src/app/core/services/daftunit.service';
import { TahapService } from 'src/app/core/services/tahap.service';
import { ITahap } from 'src/app/core/interface/itahap';


@Component({
  selector: 'app-sptjm-bok',
  templateUrl: './sptjm-bok.component.html',
  styleUrls: ['./sptjm-bok.component.scss']
})
export class SptjmBokComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  optionTahap: SelectItem[];
  tahapSelected: ITahap;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(

      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
      private unitService: DaftunitService,
      private kdtahapservice: TahapService
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
    this.getTahap();
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

  getTahap(){
    // getsBykode('321,322,323,224') multi tahap
    //gets() //all Tahap
    this.kdtahapservice.getsBykode('321,341').subscribe(resp => {
    this.optionTahap = [];
    if(resp.length > 0){
      resp.forEach(e => {
        this.optionTahap.push({label: e.uraian, value : e.kdtahap.trim()});
      });
    }
  });
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
					FileName: 'sptjmbok.rpt',
					Params: {
            '@idunit': this.unitSelected.idunit,
            '@kdtahap': this.tahapSelected,
						'@tanggal': e.TGL,
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
	}


}
