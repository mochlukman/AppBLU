import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpd } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { SpdService } from 'src/app/core/services/spd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitDpaComponent } from 'src/app/shared/lookups/look-daftunit-dpa/look-daftunit-dpa.component';
import { FormSpdrComponent } from './form-spdr/form-spdr.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-spd-belanj-pembuatan',
  templateUrl: './spd-belanj-pembuatan.component.html',
  styleUrls: ['./spd-belanj-pembuatan.component.scss']
})
export class SpdBelanjPembuatanComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: ISpd[] = [];
  dataSelected: ISpd = null;
  @ViewChild(LookDaftunitDpaComponent, {static: true}) Daftunit : LookDaftunitDpaComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(FormSpdrComponent, {static: true}) Form: FormSpdrComponent;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  constructor(
    private auth: AuthenticationService,
    private service: SpdService,
    private notif: NotifService,
    private unitService: DaftunitService,
    private reportService: ReportService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
      if(this.userInfo.Idunit != 0){
        this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
          this.callBackDaftunit(resp);
        },error => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(var i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
      }
    } else {
      this.ngOnDestroy();
    }
  }

  ngOnInit() {
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.dataSelected = null;
    this.listdata = [];
    this.getDatas();
  }
  getDatas(){
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit, 2)
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    } else {
      this.notif.warning('Pilih SKPD');
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspd === e.data.idspd);
      this.listdata = this.listdata.filter(f => f.idspd != e.data.idspd);
      this.listdata.splice(index, 0, e.data);
    }
    this.dt.reset();
  }
  add(){
    if(this.unitSelected){
      this.Form.forms.patchValue({
        idunit: this.unitSelected.idunit,
        kdtahun: this.userInfo.KdTahun,
        idxkode: 2,
        nospd: ''
      });
      this.Form.title = 'Tambah';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  update(e: ISpd){
    this.Form.forms.patchValue({
      idspd: e.idspd,
      idunit: e.idunit,
      idxkode: e.idxkode,
      nospd: e.nospd,
      tglspd: e.tglspd !== null ? new Date(e.tglspd) : new Date(),
      keterangan: e.keterangan,
      idbulan1: e.idbulan1,
      idbulan2: e.idbulan2,
      idttd: e.idttd
    });
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataKlick(e: ISpd){
		this.dataSelected = e;
	}
  print(e: ISpd){
    this.dataSelected = e;
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
      FileName: 'spd.rpt',
					Params: {
            '@idunit': this.unitSelected.idunit,
						'@kdtahap': '321',
            '@idspd': this.dataSelected.idspd,
            '@bend': '',
						'@tanggal': e.TGL,
						'@hal':e.halaman
          }
    };
    this.reportService.execPrint(parameterReport).subscribe((resp) => {
      this.reportService.extractData(resp, 1, `laporan_${this.dataSelected.nospd}`);
    });
  }
	}
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
  }
}
