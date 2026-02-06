import { IBpk } from 'src/app/core/interface/ibpk';
import { IPegawai } from 'src/app/core/interface/ipegawai';
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
import { LookBpkComponent } from 'src/app/shared/lookups/look-bpk/look-bpk.component';
import { LookPegawaiComponent } from 'src/app/shared/lookups/look-pegawai/look-pegawai.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { IStattrs } from 'src/app/core/interface/istattrs';
import { StattrsService } from 'src/app/core/services/stattrs.service';

@Component({
  selector: 'app-bpk',
  templateUrl: './bpk.component.html',
  styleUrls: ['./bpk.component.scss']
})
export class BpkComponent  implements OnInit , OnDestroy {
  loading_post: boolean;
  uiUnit: IDisplayGlobal;
  uiBpk: IDisplayGlobal;
  uiPegawai: IDisplayGlobal;
  unitSelected: IDaftunit;
  statusSelected: any;
  tahapSelected: ITahap;
  kdtahapSelected: TahapService;
  kdstatusSelected: StattrsService;
  optionStatus: SelectItem[];
  bpkSelected: IBpk;
  pegawaiSelected: IPegawai;
  userInfo: ITokenClaim;
  loading: boolean;
  itemPrints: MenuItem[];
  optionTahap: SelectItem[];
	parameterReport: IReportParameter;
	typeDocument: number;
	@ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBpkComponent,{static: true}) Bpk : LookBpkComponent;
  @ViewChild(LookPegawaiComponent,{static: true}) Pegawai : LookPegawaiComponent;
	@ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(

      private authService: AuthenticationService,
      private notif: NotifService,
      private service: StattrsService,
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
    this.uiBpk={kode: '', nama: '' };
    this.uiPegawai={kode: '', nama: '' };
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

  }

  LookBpk(){
    if(this.unitSelected){
    this.Bpk.title='Pilih Nomor BPK';
    this.Bpk._idunit = this.unitSelected.idunit;
    this.Bpk.gets(this.statusSelected,2,this.unitSelected.idunit);
    this.Bpk.showThis=true;
      } else {
        this.notif.warning('Pilih Unit Organisasi');
      }
    }
  callBackBpk(e: IBpk){
    this.bpkSelected = e;
    this.uiBpk = {kode: e.nobpk, nama: e.tglbpk !== null ? new Date(e.tglbpk).toLocaleDateString('en-US') : ''}
  }

  LookPegawai(){
    if(this.unitSelected){
    this.Pegawai.title='Pilih Pegawai';
    this.Pegawai._idunit = this.unitSelected.idunit;
    this.Pegawai.gets(this.unitSelected.idunit);
    this.Pegawai.showThis=true;
      } else {
        this.notif.warning('Pilih Unit Organisasi');
      }
    }
  callBackPegawai(e: IPegawai){
    this.pegawaiSelected = e;
    this.uiPegawai = { kode: e.nip, nama: e.nama };
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');  // this.userInfo.Idunit);  //userunit
    this.Daftunit.showThis = true;

    this.uiBpk = { kode: '', nama: '' };
    this.bpkSelected=undefined;

    this.uiPegawai = { kode: '', nama: '' };
    this.pegawaiSelected=undefined;

  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    if(this.unitSelected){
      this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
    }
  }

  getStattrs(){
  this.service.getBylist('21,20,27').subscribe(resp => {
    this.optionStatus = [];
    if(resp.length > 0){
      resp.forEach(e => {
        this.optionStatus.push({label: e.lblstatus, value : e.kdstatus.trim()});
      });
    }
  });
}

  callBackTanggal(e: any){
		if(e.cetak){
			if (!this.unitSelected) {
				this.notif.warning('SKPD harus dipilih');
			} else if (!this.bpkSelected) {
				this.notif.warning('No BPK harus dipilih');
      }
      else {
				this.loading_post = true;
				this.parameterReport = {
					Type: this.typeDocument,
					FileName: 'bpk.rpt',
					Params: {

						'@idunit': this.unitSelected.idunit,
            '@nobpk' : this.bpkSelected.nobpk,
            '@nip': this.pegawaiSelected.nip,
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
    this.uiBpk = { kode: '', nama: '' };
		this.bpkSelected = null;
    this.uiPegawai = { kode: '', nama: '' };
		this.pegawaiSelected = null;
    this.optionTahap=[];
		this.tahapSelected=undefined;

	}

}

