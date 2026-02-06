import { IStattrs } from 'src/app/core/interface/istattrs';
import { ISp2d } from 'src/app/core/interface/isp2d';
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
import { LookSp2dComponent } from 'src/app/shared/lookups/look-sp2d/look-sp2d.component';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import {DaftunitService} from 'src/app/core/services/daftunit.service';


@Component({
  selector: 'app-sp2d',
  templateUrl: './sp2d.component.html',
  styleUrls: ['./sp2d.component.scss']
})
export class Sp2dComponent implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiSp2d: IDisplayGlobal;
  optionStatus: SelectItem[];
  statusSelected:any;
  listRekening: SelectItem[];
  rekeningSelected:any;
  unitSelected: IDaftunit;
  sp2dSelected: ISp2d;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookSp2dComponent,{static: true}) Sp2d : LookSp2dComponent;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(
    private authService: AuthenticationService,
    private notif: NotifService,
    private reportService: ReportService,
    private StatusService: StattrsService,
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
    this.getStatus();
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


  getStatus(){
    this.StatusService.getBylist('21,22,23,24').subscribe(resp => {
      this.optionStatus = [];
      if(resp.length > 0){
        resp.forEach(e => {
          this.optionStatus.push({label: e.lblstatus, value : e.kdstatus.trim()});
          });
        }
      });
    }
  lookSp2d(){
    if(this.unitSelected,this.statusSelected,this.rekeningSelected){
      this.Sp2d.title = 'Pilih SP2D';
      this.Sp2d.params = {
        'Parameters.Idunit' : this.unitSelected.idunit,
        'Parameters.Kdstatus' : this.statusSelected,
        'Parameters.Idxkode' : this.rekeningSelected,
        'Parameters.Penolakan' : '1'
      }
      this.Sp2d.showThis = true;
      } else if (!this.unitSelected)  {
        this.notif.warning('Pilih Unit Organisasi');
      } else if (!this.statusSelected) {
        this.notif.warning('Pilih Jenis Bukti');
      } else {
        this.notif.warning('Pilih Jenis Rekening');
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
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
  }


  callBackTanggal(e: any){
		if(e.cetak){
			if (!this.unitSelected) {
				this.notif.warning('SKPD harus dipilih');
			} else if (!this.sp2dSelected) {
				this.notif.warning('SP2D harus dipilih');
			}
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'sp2d.rpt',
					Params: {
            '@idsp2d' : this.sp2dSelected.idsp2d,
            '@idxkode' :this.sp2dSelected.idxkode,
            '@jnsrek':this.rekeningSelected,
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
		this.unitSelected = null;
    this.uiSp2d = { kode: '', nama: '' };
		this.sp2dSelected = null;
    this.optionStatus=[];
		this.statusSelected=undefined;
  }

}
