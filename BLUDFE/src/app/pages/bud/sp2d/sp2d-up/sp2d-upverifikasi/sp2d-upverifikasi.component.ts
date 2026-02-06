import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Sp2dService } from 'src/app/core/services/sp2d.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { Sp2dUpverifikasiCheckComponent } from './sp2d-upverifikasi-check/sp2d-upverifikasi-check.component';
import { Sp2dUpverifikasiFormComponent } from './sp2d-upverifikasi-form/sp2d-upverifikasi-form.component';
import { ReportService } from 'src/app/core/services/report.service';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';

@Component({
  selector: 'app-sp2d-upverifikasi',
  templateUrl: './sp2d-upverifikasi.component.html',
  styleUrls: ['./sp2d-upverifikasi.component.scss']
})
export class Sp2dUpverifikasiComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  loading_rek: boolean;
  listdata: ISp2d[] = [];
  dataSelected: ISp2d = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(Sp2dUpverifikasiFormComponent, {static: true}) Form : Sp2dUpverifikasiFormComponent;
  @ViewChild(Sp2dUpverifikasiCheckComponent, {static: true}) Checks: Sp2dUpverifikasiCheckComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  sp2dSelected: ISp2d;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: Sp2dService,
    private notif: NotifService,
    private unitService: DaftunitService,
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdstatus: '21',
      idxkode: 6
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 1){
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
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    this.dataSelected = null;
    this.get();
  }
  get(){
    if(this.formFilter.valid && this.tabIndex == 1){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service.gets()
        .subscribe(resp => {
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
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idsp2d === e.data.idsp2d);
      this.listdata = this.listdata.filter(f => f.idsp2d != e.data.idsp2d);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  print(e: ISp2d){
    this.sp2dSelected = e;
    this.showTanggal.useTgl = true;
		this.showTanggal.useHal = true;
		this.showTanggal.showThis = true;
  }
  callBackTanggal(e: any){
    let parameterReport = {
      Type: 1,
      FileName: 'spd.rpt',
      Params: {
        '@idunit': this.unitSelected.idunit,
        '@nosp2d' : this.sp2dSelected.nosp2d,
        '@kdtahap': '321',
      }
    };
    this.reportService.execPrint(parameterReport).subscribe((resp) => {
      this.reportService.extractData(resp, 1, `laporan_${this.sp2dSelected.nosp2d}`);
    });
	}
  update(e: ISp2d){
    this.Form.forms.patchValue({
      idsp2d : e.idsp2d,
      idspm : e.idspm,
      idspd : e.idspd,
      idunit : e.idunit,
      nosp2d : e.nosp2d,
      nospm : e.nospm,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idttd: e.idttd,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      keperluan : e.keperluan,
      tglsp2d : e.tglsp2d != null ? new Date(e.tglsp2d) : null,
      tglvalid : e.tglvalid !== null ? new Date(e.tglvalid) : new Date(),
      valid: e.valid,
      verifikasi: e.verifikasi,
      validasi: e.validasi,
      penolakan: e.penolakan,
      idppk: e.idppk
    });
    if(e.idspmNavigation){
      this.Form.uiSpm = {kode: e.idspmNavigation.nospm, nama: e.idspmNavigation.tglspm !== null ? new Date(e.idspmNavigation.tglspm).toLocaleDateString('en-US') : null};
      this.Form.spmSelected = e.idspmNavigation;
      this.Form.forms.patchValue({
        nilaiup: new Intl.NumberFormat('ID').format(e.idspmNavigation.idsppNavigation.nilaiup)
      });
    }
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip,
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Pengesahan Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  lookCheck(e: ISp2d){
    this.Checks.title = 'Check List Dokumen';
    this.Checks._idsp2d = e.idsp2d;
    this.Checks._idxkode = e.idxkode;
    this.Checks.showThis = true;
  }
  delete(e: ISp2d){
    let postBody = {
      idsp2d: e.idsp2d,
      nosp2d: e.nosp2d,
      kdstatus: e.kdstatus,
      tglsp2d: e.tglsp2d,
      idspm: e.idspm,
      noreg: e.noreg,
      tglvalid: null,
      valid: null,
      validasi: '',
      penolakan: 0
    };
    this.notif.confir({
      message: `Batalkan Pengesahan ?`,
      accept: () => {
        this.service.pengesahan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.callback({
                edited: true,
                data: resp.body
              });
              this.notif.success('Pengesahan Berhasil Dibatalkan');
            }
          }, (error) => {
            if (Array.isArray(error.error.error)) {
              for (var i = 0; i < error.error.error.length; i++) {
                this.notif.error(error.error.error[i]);
              }
            } else {
              this.notif.error(error.error);
            }
          });
      },
      reject: () => {
        return false;
      }
    });
  }
  dataKlick(e: ISp2d){
		this.dataSelected = e;
	}
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    if(this.formFilter) this.formFilter.reset(this.initialForm);
  }
}
