import { ISpm } from 'src/app/core/interface/ispm';
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
import { LookSpmComponent } from 'src/app/shared/lookups/look-spm/look-spm.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { IStattrs } from 'src/app/core/interface/istattrs';
import { StattrsService } from 'src/app/core/services/stattrs.service';

@Component({
  selector: 'app-s-opd',
  templateUrl: './s-opd.component.html',
  styleUrls: ['./s-opd.component.scss']
})
export class SopdComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiSpm: IDisplayGlobal;
  unitSelected: IDaftunit;
  statusSelected: any;
  tahapSelected: ITahap;
  kdtahapSelected: TahapService;
  kdstatusSelected: StattrsService;
  optionStatus: SelectItem[];
  spmSelected: ISpm;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  optionTahap: SelectItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookSpmComponent,{static: true}) Spm : LookSpmComponent;
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
      this.uiSpm={kode: '', nama: '' };
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

  LookSpm(){
    if(this.unitSelected){
    this.Spm.title = 'Pilih Nomor S-OPD';
    this.Spm.params = {
      'Parameters.Idunit' : this.unitSelected.idunit,
      'Parameters.Idxkode' : 2,
      'Parameters.Kdstatus' : this.statusSelected,
      'Parameters.Idkeg' : 0,
      'Parameters.Idbend' : 0,
    }
    this.Spm.showThis = true;
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callBackSpm(e: ISpm){
    this.spmSelected = e;
    this.uiSpm = {kode: e.nospm, nama: e.tglspm !== null ? new Date(e.tglspm).toLocaleDateString('en-US') : ''}
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;

    this.uiSpm = { kode: '', nama: '' };
    this.spmSelected=undefined;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
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
			} else if (!this.spmSelected) {
				this.notif.warning('SOPD harus dipilih');
			}
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'sopd.rpt',
					Params: {

						'@idunit': this.unitSelected.idunit,
            '@nospm' : this.spmSelected.nospm,
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
    this.uiSpm = { kode: '', nama: '' };
		this.spmSelected = null;
    this.optionTahap=[];
		this.tahapSelected=undefined;

	}

}
