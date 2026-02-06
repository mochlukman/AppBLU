import { ReportService } from 'src/app/core/services/report.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { indoKalender } from 'src/app/core/local';
import { TahapService } from 'src/app/core/services/tahap.service';
import { ITahap } from 'src/app/core/interface/itahap';


@Component({
  selector: 'app-barekon-dana-bok',
  templateUrl: './barekon-dana-bok.component.html',
  styleUrls: ['./barekon-dana-bok.component.scss']
})
export class BarekonDanaBokComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  optionTahap: SelectItem[];
  tahapSelected: ITahap;
  listBulan: SelectItem[];
  bulanSelected:any;
  indoKalender: any;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  tglAwal: string;
  tglAkhir: string;
  constructor(
      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
      private kdtahapservice: TahapService
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
    this.getTahap();
    this.getBulan();

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

  getBulan(){
    this.listBulan = [
      {label: 'Pilih Bulan' , value: null},
      {label: 'Januari' , value: '1'},
      {label: 'Februari' , value: '2'},
      {label: 'Maret' , value: '3'},
      {label: 'April' , value: '4'},
      {label: 'Mei' , value: '5'},
      {label: 'Juni' , value: '6'},
      {label: 'Juli' , value: '7'},
      {label: 'Agustus' , value: '8'},
      {label: 'September' , value: '9'},
      {label: 'Oktober' , value: '10'},
      {label: 'Nopember' , value: '11'},
      {label: 'Desember' , value: '12'}
    ];
  }
  callBackTanggal(e: any){
		if(e.cetak){
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'barbok.rpt',
					Params: {

						'@kdtahap': this.tahapSelected,
            '@bln': this.bulanSelected,
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
  cetak(type: number) {
		this.typeDocument = type;
		this.showTanggal.useTgl = true;
		this.showTanggal.useHal = true;
		this.showTanggal.showThis = true;
	}
  ngOnDestroy() {
    this.tglAwal = '';
    this.tglAkhir = '';
	}
}
