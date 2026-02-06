
import { ITbp } from 'src/app/core/interface/itbp';
import { ReportService } from 'src/app/core/services/report.service';
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
import { LookTbpComponent } from 'src/app/shared/lookups/look-tbp/look-tbp.component';
import {DaftunitService} from 'src/app/core/services/daftunit.service';


@Component({
  selector: 'app-tbp',
  templateUrl: './tbp.component.html',
  styleUrls: ['./tbp.component.scss']
})
export class TbpComponent implements OnInit, OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiTbp: IDisplayGlobal;
  optionStatus: SelectItem[];
  listRekening: SelectItem[];
  rekeningSelected:any;
  unitSelected: IDaftunit;
  tbpSelected: ITbp;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookTbpComponent,{static: true}) Tbp : LookTbpComponent;
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
      }, error => {
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < error.error.error.length; i++) {
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
      this.uiUnit={kode: '', nama: '' };
      this.uiTbp={kode: '', nama: '' };
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

    this.getRekening();
  }
  getRekening(){
    this.listRekening = [
      {label: 'Pilih' , value: null},
      {label: 'Pendapatan' , value: '1'},
      {label: 'Belanja Langsung' , value: '2'},
      {label: 'Belanja Langsung Gaji' , value: '4'},
      {label: 'Pembiayaan' , value: '5'},
      {label: 'Uang Persediaan' , value: '6'}
    ];
  }



  lookTbp(){
    if(this.unitSelected,this.rekeningSelected){
      this.Tbp.title='Pilih TBP';
      this.Tbp.gets(this.unitSelected.idunit,'x',this.rekeningSelected);
      this.Tbp.showThis=true;
      } else if (!this.unitSelected)  {
        this.notif.warning('Pilih Unit Organisasi');
      } else {
        this.notif.warning('Pilih Jenis Rekening');
      }
  }
  callBackTbp(e: ITbp){
    this.tbpSelected = e;
    this.uiTbp = {kode: e.notbp, nama: e.tgltbp !== null ? new Date(e.tgltbp).toLocaleDateString('en-US') : ''}
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;
    this.uiTbp = { kode: '', nama: '' };
    this.tbpSelected=undefined;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }


  callBackTanggal(e: any){
		if(e.cetak){
			if (!this.unitSelected) {
				this.notif.warning('SKPD harus dipilih');
			} else if (!this.tbpSelected) {
				this.notif.warning('TBP harus dipilih');
			}
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'tbp.rpt',
					Params: {
            '@idtbp' : this.tbpSelected.idtbp,
            '@idxkode' :this.tbpSelected.idxkode,
            // '@jnsrek':this.rekeningSelected,
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
    this.uiTbp = { kode: '', nama: '' };
		this.tbpSelected = null;
    this.optionStatus=[];
  }


}
