import { ISp2d } from 'src/app/core/interface/isp2d';
import { ReportService } from 'src/app/core/services/report.service';
import { ITahap } from 'src/app/core/interface/itahap';
import { TahapService } from 'src/app/core/services/tahap.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { LookSp2dComponent } from 'src/app/shared/lookups/look-sp2d/look-sp2d.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { IStattrs } from 'src/app/core/interface/istattrs';
import { StattrsService } from 'src/app/core/services/stattrs.service';

@Component({
  selector: 'app-s-pd',
  templateUrl: './s-pd.component.html',
  styleUrls: ['./s-pd.component.scss']
})
export class SpdComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiSp2d: IDisplayGlobal;
  unitSelected: IDaftunit;
  statusSelected: any;
  tahapSelected: ITahap;
  kdtahapSelected: TahapService;
  kdstatusSelected: StattrsService;
  optionStatus: SelectItem[];
  sp2dSelected: ISp2d;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  optionTahap: SelectItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookSp2dComponent,{static: true}) Sp2d : LookSp2dComponent;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(
      private authService: AuthenticationService,
      private notif: NotifService,
      private service: StattrsService,
      private kdtahapservice: TahapService,
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
      this.uiSp2d={kode: '', nama: '' };
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
    this.getStattrs();
    this.getTahap();

  }

  LookSp2d(){
    if(this.unitSelected){
      this.Sp2d.title = 'Pilih Nomor S-PD';
      this.Sp2d.params = {
        'Parameters.Idunit' : this.unitSelected.idunit,
        'Parameters.Kdstatus' : this.statusSelected
      }
      this.Sp2d.showThis = true;
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callBackSp2d(e: ISp2d){
    this.sp2dSelected = e;
    this.uiSp2d = {kode: e.nosp2d, nama: e.tglsp2d !== null ? new Date(e.tglsp2d).toLocaleDateString('en-US') : ''}
  }

  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;

    this.uiSp2d = { kode: '', nama: '' };
    this.sp2dSelected=undefined;

  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    if(this.unitSelected){
      this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
    }
  }

  getStattrs(){
  this.service.getBylist('21,22,24').subscribe(resp => {
    this.optionStatus = [];
    if(resp.length > 0){
      resp.forEach(e => {
        this.optionStatus.push({label: e.lblstatus, value : e.kdstatus.trim()});
      });
    }
  });
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
			} else if (!this.sp2dSelected) {
				this.notif.warning('Nomor S-PD harus dipilih');
			}
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'spd.rpt',
					Params: {

						'@idunit': this.unitSelected.idunit,
            '@nosp2d' : this.sp2dSelected.nosp2d,
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
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
    this.uiSp2d = { kode: '', nama: '' };
		this.sp2dSelected = null;
    this.optionTahap=[];
		this.tahapSelected=undefined;

	}

}
