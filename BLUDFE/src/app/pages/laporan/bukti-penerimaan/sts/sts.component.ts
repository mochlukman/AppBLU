
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
import { ISts } from 'src/app/core/interface/ists';
import { LookStsForBkuComponent } from 'src/app/shared/lookups/look-sts-for-bku/look-sts-for-bku.component';
import { LookStsComponent } from 'src/app/shared/lookups/look-sts/look-sts.component';
import {DaftunitService} from 'src/app/core/services/daftunit.service';

@Component({
  selector: 'app-sts',
  templateUrl: './sts.component.html',
  styleUrls: ['./sts.component.scss']
})
export class StsComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiSts: IDisplayGlobal;
  optionStatus: SelectItem[];
  listRekening: SelectItem[];
  rekeningSelected:any;
  unitSelected: IDaftunit;
  stsSelected: ISts;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookStsComponent,{static: true}) Sts : LookStsComponent;
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
      this.uiSts={kode: '', nama: '' };
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
      {label: 'Belanja' , value: '2'},
      {label: 'Pembiayaan' , value: '5'},
      {label: 'Uang Persediaan' , value: '6'}
    ];
  }
  lookSts(){
    if(this.unitSelected && this.rekeningSelected){
      this.Sts.title='Pilih STS';
      this.Sts._idunit = this.unitSelected.idunit;
      this.Sts._idxkode = this.rekeningSelected;
      this.Sts.gets();
      this.Sts.showThis=true;
    } else {
      this.notif.warning('Pilih Unit Organisasi & Jenis Rekening');
    }
  }
  callBackSts(e: ISts){
    this.stsSelected = e;
    this.uiSts = {kode: e.nosts, nama: e.tglsts !== null ? new Date(e.tglsts).toLocaleDateString('en-US') : ''}
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;
    this.uiSts = { kode: '', nama: '' };
    this.stsSelected=undefined;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }


  callBackTanggal(e: any){
		if(e.cetak){
			if (!this.unitSelected) {
				this.notif.warning('SKPD harus dipilih');
			} else if (!this.stsSelected) {
				this.notif.warning('STS harus dipilih');
			}
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'sts.rpt',
					Params: {
            '@idsts' : this.stsSelected.idsts,
            '@idxkode' :this.stsSelected.idxkode,
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
    this.uiSts = { kode: '', nama: '' };
		this.stsSelected = null;
    this.optionStatus=[];
  }
}
