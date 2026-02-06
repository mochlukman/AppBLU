import { ReportService } from 'src/app/core/services/report.service';
import { ITahap } from 'src/app/core/interface/itahap';
import { TahapService } from 'src/app/core/services/tahap.service';
import { MenuItem, SelectItem } from 'primeng/api';
import { IReportParameter } from 'src/app/core/interface/ireport-parameter';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { StrurekService } from 'src/app/core/services/strurek.service';
import { LookMkegiatanByKegunitComponent } from 'src/app/shared/lookups/look-mkegiatan-by-kegunit/look-mkegiatan-by-kegunit.component';
import {DaftunitService} from 'src/app/core/services/daftunit.service';

@Component({
  selector: 'app-rka-perubahan-rincian',
  templateUrl: './rka-perubahan-rincian.component.html',
  styleUrls: ['./rka-perubahan-rincian.component.scss']
})
export class RkaPerubahanRincianComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  kegSelected: ILookupTree;
  uiKeg: IDisplayGlobal;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	optionTahap: SelectItem[];
  optionKdlevel: SelectItem[];
	tahapSelected: ITahap;
  kdlevelSelected:StrurekService;
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookMkegiatanByKegunitComponent, {static: true}) Kegiatan : LookMkegiatanByKegunitComponent;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(

      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
      private service: TahapService,
      private kdlevelService: StrurekService,
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
      this.uiKeg = {kode: '', nama: ''};
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
    this.getReklevel();
  }
  getTahap(){
    	// getsBykode('321,322,323,224') multi tahap
      //gets() //all Tahap
     this.service.getsBykode('331,341').subscribe(resp => {
		  this.optionTahap = [];
		  if(resp.length > 0){
				resp.forEach(e => {
			  	this.optionTahap.push({label: e.uraian, value : e.kdtahap.trim()});
				});
		  }
		});
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
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }
  lookKegiatan(){
    if(this.unitSelected){
      this.Kegiatan.title = 'Pilih Kegiatan';
      this.Kegiatan._idunit = this.unitSelected.idunit;
      this.service._kdtahap = this.tahapSelected.kdtahap;
      this.Kegiatan._type = 'subkegiatan';
      this.Kegiatan.get();
      this.Kegiatan.showThis = true;
    } else {
      this.notif.warning('Pilih SKPD');
    }
  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
  }

  callBackTanggal(e: any){
		if(e.cetak){
			if (!this.unitSelected) {
				this.notif.warning('SKPD harus dipilih');
			} else if(!this.tahapSelected){
				this.notif.warning('Pilih Tahap')
			// } else if(!this.kdlevelSelected){
			// 	this.notif.warning('Pilih Level Rekening')
			}
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'rka221p.rpt',
					Params: {
						'@kdtahap': this.tahapSelected,
						'@idunit': this.unitSelected.idunit,
            '@idkeg': this.kegSelected.data_id,
            // '@kdlevel':this.kdlevelSelected,
						'@tanggal': e.TGL,
						'@hal':e.halaman
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
    this.uiKeg = { kode: '', nama: '' };
		this.unitSelected = null;
    this.kegSelected = null;
		this.optionTahap=[];
		this.tahapSelected=undefined;
    // this.kdlevelSelected=undefined;
	}

}
