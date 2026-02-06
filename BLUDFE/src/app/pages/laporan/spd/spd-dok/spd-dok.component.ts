import { Ibend } from 'src/app/core/interface/ibend';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpd } from 'src/app/core/interface/ispd';
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
import { LookSpdComponent } from 'src/app/shared/lookups/look-spd/look-spd.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import {DaftunitService} from 'src/app/core/services/daftunit.service';


@Component({
  selector: 'app-spd-dok',
  templateUrl: './spd-dok.component.html',
  styleUrls: ['./spd-dok.component.scss']
})
export class SpdDokComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiSpd: IDisplayGlobal;
  spdSelected: ISpd;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	optionTahap: SelectItem[];
	tahapSelected: ITahap;
	parameterReport: IReportParameter;
	typeDocument: number;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookSpdComponent,{static: true}) Spd : LookSpdComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(

      private authService: AuthenticationService,
      private notif: NotifService,
      private reportService: ReportService,
      private service: TahapService,
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
      this.uiSpd = {kode: '', nama: ''};
      this.uiBend = {kode: '', nama: ''};
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
    // this.getReklevel();
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;

    this.uiSpd = { kode: '', nama: '' };
    this.uiBend = { kode: '', nama: '' };
    this.spdSelected=undefined;
    this.bendSelected=undefined;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }
  lookSpd(){
    if(this.unitSelected){
    this.Spd.title = 'Pilih SPD';
    this.Spd.gets(this.unitSelected.idunit);
    this.Spd.showThis = true;
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callbackSpd(e: ISpd){
    this.spdSelected = e;
    this.uiSpd = {kode: e.nospd, nama: e.tglspd !== null ? new Date(e.tglspd).toLocaleDateString('en-US') : ''};
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
  getTahap(){
    	// getsBykode('321,322,323,224') multi tahap
      this.service.getsBykode('321,322,323,324,325,326,327,328,329').subscribe(resp => {
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
			}  else if(!this.spdSelected){
				this.notif.warning('Pilih SPD')
      } else if(!this.bendSelected){
				this.notif.warning('Pilih Bendahara')
			}else if(!this.tahapSelected){
				this.notif.warning('Pilih Tahap')
			}
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'spd.rpt',
					Params: {
            '@idunit': this.unitSelected.idunit,
						'@kdtahap': this.tahapSelected,
            '@idspd': this.spdSelected.idspd,
            '@bend': this.bendSelected.idbend,
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
    this.uiSpd = { kode: '', nama: '' };
    this.uiBend = { kode: '', nama: '' };
		this.optionTahap=[];
		this.tahapSelected=undefined;
    this.spdSelected=undefined;
    this.bendSelected=undefined;
	}

}
