import { ReportService } from 'src/app/core/services/report.service';
import { ITahap } from 'src/app/core/interface/itahap';
import { TahapService } from 'src/app/core/services/tahap.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';

@Component({
  selector: 'app-rekap-silpa',
  templateUrl: './rekap-silpa.component.html',
  styleUrls: ['./rekap-silpa.component.scss']
})
export class RekapSilpaComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	optionTahap: SelectItem[];
	tahapSelected: ITahap;
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(

      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
      private service: TahapService,
  ) {
    this.userInfo=this.authService.getTokenInfo();
   
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
  getTahap(){
    this.service.getsBykode('311,321').subscribe(resp => {
      //this.service.gets().subscribe(resp => {
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
			 if(!this.tahapSelected){
				this.notif.warning('Pilih Tahap')
			} 
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'Rekapsilpa.rpt',
					Params: {
						'@kdtahap': this.tahapSelected,
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
		this.optionTahap=[];
		this.tahapSelected=undefined;
	}
}


