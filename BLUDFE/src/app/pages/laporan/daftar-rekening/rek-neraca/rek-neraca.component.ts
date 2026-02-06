import { ReportService } from 'src/app/core/services/report.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';;
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { StrurekService } from 'src/app/core/services/strurek.service';

@Component({
  selector: 'app-rek-neraca',
  templateUrl: './rek-neraca.component.html',
  styleUrls: ['./rek-neraca.component.scss']
})
export class RekNeracaComponent  implements OnInit , OnDestroy {
  loading_post: boolean;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  optionKdlevel: SelectItem[];
  kdlevelSelected:StrurekService;
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(

      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
      private kdlevelService: StrurekService,
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
    this.getReklevel();
  }

  getReklevel(){
		this.kdlevelService.gets().subscribe(resp => {
			this.optionKdlevel=[];
			if(resp.length > 0){
        resp.forEach(e => {
					this.optionKdlevel.push({label: e.nmlevel,value : e.mtglevel});
				})
      }
    });
	}

  callBackTanggal(e: any){
		if(e.cetak){
			if(!this.kdlevelSelected){
				this.notif.warning('Pilih Level Rekening')
			}
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'Reknrc.rpt',
					Params: {
            '@kdlevel':this.kdlevelSelected,
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
    this.kdlevelSelected=undefined;
	}
}


