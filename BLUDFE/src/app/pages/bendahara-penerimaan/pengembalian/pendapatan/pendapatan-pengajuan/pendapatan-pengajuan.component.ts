import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PengembalianMainPageService } from 'src/app/core/services/pengembalian-main-page.service';
import { SpmService } from 'src/app/core/services/spm.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { StattrsService } from 'src/app/core/services/stattrs.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { ReportService } from 'src/app/core/services/report.service';
import { PendapatanPengajuanFormComponent } from './pendapatan-pengajuan-form/pendapatan-pengajuan-form.component';

@Component({
  selector: 'app-pendapatan-pengajuan',
  templateUrl: './pendapatan-pengajuan.component.html',
  styleUrls: ['./pendapatan-pengajuan.component.scss']
})
export class PendapatanPengajuanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  indexSubs : Subscription;
  userInfo: ITokenClaim;
  loading: boolean;
  formFilter: FormGroup;
  initialForm: any;
  listdata: any[] = [];
  dataSelected: any;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(PendapatanPengajuanFormComponent, {static: true}) Form: PendapatanPengajuanFormComponent;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  spmSelected: ISpm;
  constructor(
    private mainService: PengembalianMainPageService,
    private auth: AuthenticationService,
    private notif: NotifService,
    private fb: FormBuilder,
    private service: SpmService,
    private unitService: DaftunitService,
    private reportService: ReportService,
    private stattrsService: StattrsService) {
      this.formFilter = this.fb.group({
        idunit: [0, [Validators.required, Validators.min(1)]],
        idbend: [0, [Validators.required, Validators.min(1)]],
        kdstatus: ['24'],
        idxkode: 1
      });
      this.initialForm = this.formFilter.value;
      this.userInfo = this.auth.getTokenInfo();
      this.uiUnit = {kode: '', nama: ''};
      this.indexSubs = this.mainService._tabIndex.subscribe(resp => {
        if(resp === 0){}
      });
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
    this.dataSelected = null;
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idbend: 0
    });
    this.dataSelected = null;
    this.listdata = [];
    this.get();
  }
  get(){
    if(this.unitSelected){
      this.dataSelected = null;
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._idbend = this.formFilter.value.idbend;
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
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idspm === e.data.idspm);
      this.listdata = this.listdata.filter(f => f.idspm != e.data.idspm);
      this.listdata.splice(index, 0, e.data);
    }
    this.dataSelected = null;
  }
  add(){
    if(this.unitSelected){
      this.service.getNoreg(this.formFilter.value.idunit, this.formFilter.value.idbend, this.formFilter.value.idxkode, this.formFilter.value.kdstatus)
        .subscribe(resp => {
          if(resp.noreg){
            let noreg =  resp.noreg;
            this.stattrsService.get('24')
            .subscribe(resp => {
              this.Form.forms.patchValue({
                idunit : this.formFilter.value.idunit,
                kdstatus : this.formFilter.value.kdstatus,
                idxkode : this.formFilter.value.idxkode,
                idbend: this.formFilter.value.idbend,
                nospm: `${noreg}/SPM-${resp.lblstatus}-PENGEMBALIAN/${this.unitSelected.kdunit}/${this.userInfo.NmTahun}`,
                noreg: noreg
              });
              this.Form.nmstatus = resp.lblstatus.trim();
              this.Form.title = 'Tambah SPM - Pengembalian Pendapatan';
              this.Form.mode = 'add';
              this.Form.showThis = true;
            },(error) => {
              if(Array.isArray(error.error.error)){
                for(var i = 0; i < error.error.error.length; i++){
                  this.notif.error(error.error.error[i]);
                }
              } else {
                this.notif.error(error.error);
              }
            });
          }
        }, (error) => {
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
  print(e: ISpm){
      this.spmSelected = e;
      this.showTanggal.useTgl = true;
      this.showTanggal.useHal = true;
      this.showTanggal.showThis = true;
    }
    callBackTanggal(e: any){
      let parameterReport = {
        Type: 1,
        FileName: 'SPDPND.rpt',
        Params: {
          '@IDSPDpnd': this.spmSelected.idspm,
          '@IDXKODE' : 2,
        }
      };
      this.reportService.execPrint(parameterReport).subscribe((resp) => {
        this.reportService.extractData(resp, 1, `laporan_${this.spmSelected.nospm}`);
      });
    }
  update(e: ISpm){
    this.Form.forms.patchValue({
      idspm: e.idspm,
      idunit : e.idunit,
      nospm : e.nospm,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      noreg : e.noreg,
      ketotor : e.ketotor,
      keperluan : e.keperluan,
      idphk3:  e.idphk3,
      tglspm : e.tglspm != null ? new Date(e.tglspm) : '',
      idskp: e.idskp
    });
    if(e.idphk3Navigation){
      this.Form.uiPhk3 = {kode: e.idphk3Navigation.nmphk3, nama: e.idphk3Navigation.nminst};
      this.Form.phk3Selected = e.idphk3Navigation;
    }
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip,
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    if(e.idskpNavigation){
      this.Form.skpSeleceted = e.idskpNavigation;
      this.Form.uiSkp = {
        kode: e.idskpNavigation.noskp,
        nama: e.idskpNavigation.uraiskp
      };
    }
    this.Form.title = 'Ubah SPM - Pengembalian Pendapatan';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISpm){
    this.notif.confir({
			message: `${e.nospm} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idspm).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idspm !== e.idspm);
              this.notif.success('Data berhasil dihapus');
              if(this.dt) this.dt.reset();
						}
					}, (error) => {
            if(Array.isArray(error.error.error)){
              for(var i = 0; i < error.error.error.length; i++){
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
  dataKlick(e: ISpm){
    this.dataSelected = e;
	}
  ngOnDestroy(): void{
    this.unitSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
    this.loading = false;
    this.listdata = [];
    this.dataSelected = null;
  }
}
