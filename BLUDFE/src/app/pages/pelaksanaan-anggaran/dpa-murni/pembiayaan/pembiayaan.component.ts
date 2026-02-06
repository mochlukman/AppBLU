import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDpa } from 'src/app/core/interface/idpa';
import { IDpab } from 'src/app/core/interface/idpab';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { DpaService } from 'src/app/core/services/dpa.service';
import { DpabService } from 'src/app/core/services/dpab.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitDpaComponent } from 'src/app/shared/lookups/look-daftunit-dpa/look-daftunit-dpa.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-pembiayaan',
  templateUrl: './pembiayaan.component.html',
  styleUrls: ['./pembiayaan.component.scss']
})
export class PembiayaanComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  // unitSelected: IDaftunit;
  unitSelected:any;
  userInfo: ITokenClaim;
  loading_sk: boolean;
  loading_rek: boolean;
  listdata: IDpa[] = [];
  totalRecords: number;
  listrek: IDpab[] = [];
  skSelected: IDpa = null;
  rekSelected: IDpab = null;
  @ViewChild(LookDaftunitDpaComponent, {static: true}) Daftunit : LookDaftunitDpaComponent;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild('dtrek',{static:true}) dtrek: any;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: DpaService,
    private service_rek: DpabService,
    private notif: NotifService,
    private unitService: DaftunitService,
    private fb: FormBuilder,
    private global: GlobalService,
    private reportService: ReportService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: '321',
      idxkode: 2
    });
    this.initialForm = this.formFilter.value;
    this.service_rek._nilaiRek.subscribe(resp => {
      if(this.rekSelected){
        if(this.listrek.length > 0){
          this.listrek.map(m => {
            if(m.iddpab == this.rekSelected.iddpab){
							m.nilai = resp;
						}
						this.dtrek.reset();
          });
        }
			}
    });
    if(this.userInfo.Idunit != 0){
      this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
        this.callBackDaftunit(resp);
      },error => {
        this.loading_sk = false;
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  ngOnInit() {
    this.tabIndex = 0;
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.skSelected = null;
    this.rekSelected = null;
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    if(this.dt) this.dt.reset();
  }
  gets(event: LazyLoadEvent){
    if(this.formFilter.valid){
      this.loading_sk = true;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdtahap = this.formFilter.value.kdtahap;
      this.service.paging().subscribe(resp => {
        this.totalRecords = resp.totalrecords;
        this.listdata = resp.data;
        this.loading_sk = false;
      }, error => {
        this.loading_sk = false;
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  skKlick(e: IDpa){
		this.skSelected = e;
    this.getRek();
	}
  getRek(){
    if(this.skSelected){
      if(this.dtrek) this.dtrek.reset();
      this.loading_rek = true;
      this.listrek = [];
      this.service_rek.gets(this.skSelected.iddpa, this.skSelected.kdtahap)
        .subscribe(resp => {
          if(resp.length){
            this.listrek = [...resp];
          } else {
            this.notif.info('Data Rekening Tidak Tersedia');
          }
          this.loading_rek = false;
        }, error => {
          this.loading_rek = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    }
  }
  totalNilai(){
    let total = 0;
		if(this.listrek.length > 0){
			this.listrek.forEach(f => total += f.nilai);
		}
		return total;
  }
  rekKlik(e: IDpab){
    this.rekSelected = e;
  }
  onChangeTab(e: any){
		this.tabIndex = e.index;
	}
  print(e: IDpa){
    this.skSelected= e;
    this.showTanggal.useTgl = true;
		this.showTanggal.useHal = true;
		this.showTanggal.showThis = true;
  }
  callBackTanggal(e: any){
    if (!this.unitSelected) {
      this.notif.warning('SKPD harus dipilih');
    }
    else {
    let parameterReport = {
      Type: 1,
      FileName: 'Dba32.rpt',
					Params: {
            '@idunit': this.unitSelected.idunit,
						'@kdtahap': '321',
            //'@kdlevel':this.kdlevelSelected,
						//'@tanggal': e.TGL,
						//'@hal':e.halaman
            } 
    };
    this.reportService.execPrint(parameterReport).subscribe((resp) => {
      this.reportService.extractData(resp, 1, `laporan_${this.skSelected.nodpa}`);
    });
  }
	}
  ngOnDestroy(): void {
    this.formFilter.reset(this.initialForm);
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.skSelected = null;
    this.rekSelected = null;
  }
}
