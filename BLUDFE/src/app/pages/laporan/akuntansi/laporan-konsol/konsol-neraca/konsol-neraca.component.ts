import { ReportService } from 'src/app/core/services/report.service';
import { MenuItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { indoKalender } from 'src/app/core/local';


@Component({
  selector: 'app-konsol-neraca',
  templateUrl: './konsol-neraca.component.html',
  styleUrls: ['./konsol-neraca.component.scss']
})
export class KonsolNeracaComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  indoKalender: any;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  tglAwal: string;
  // tglAkhir: string;
  constructor(
      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
  ) {

      this.userInfo=this.authService.getTokenInfo();
   
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

  callBackTanggal(e: any){
		if(e.cetak){
		
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'Konsolidasinrc.rpt',
					Params: {

            '@tanggal': (this.tglAwal !== null || this.tglAwal != '') ? new Date(this.tglAwal).toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
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
  cetak(type: number) {
		this.typeDocument = type;
		this.showTanggal.useTgl = true;
		this.showTanggal.useHal = true;
		this.showTanggal.showThis = true;
	}
  ngOnDestroy() {
    this.tglAwal = '';
	}
}




