import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDpa } from 'src/app/core/interface/idpa';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpaService } from 'src/app/core/services/dpa.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { SkDpaPembuatanFormComponent } from './sk-dpa-pembuatan-form/sk-dpa-pembuatan-form.component';
import { ReportModalComponent } from 'src/app/shared/modals/report-modal/report-modal.component';
import { ReportService } from 'src/app/core/services/report.service';

@Component({
  selector: 'app-sk-dpa-pembuatan',
  templateUrl: './sk-dpa-pembuatan.component.html',
  styleUrls: ['./sk-dpa-pembuatan.component.scss']
})
export class SkDpaPembuatanComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  loading: boolean;
  listdata : IDpa [] = [];
  totalRecords: number;
  dataSelected: IDpa;
  userInfo: ITokenClaim;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(SkDpaPembuatanFormComponent, {static: true}) Form : SkDpaPembuatanFormComponent;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(ReportModalComponent,{static: true}) showTanggal: ReportModalComponent;
  formFilter: FormGroup;
  initialForm: any;
  reportType: string = '';
  constructor(
    private service : DpaService,
    private notif: NotifService,
    private auth: AuthenticationService,
    private fb: FormBuilder,
    private reportService: ReportService,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: '321',
      idxkode: 2
    });
    this.initialForm = this.formFilter.value;
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
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.dataSelected = null;
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    if(this.dt) this.dt.reset();
  }
  callback(e: any){
    if (e.added) {
      if (this.dt) this.dt.reset();
    } else if(e.edited){
      this.listdata.splice(this.listdata.findIndex(i => i.iddpa === e.data.iddpa), 1, e.data);
    }
    this.dataSelected = null;
  }
  ngOnInit() {
  }
  gets(event: LazyLoadEvent){
    if(this.formFilter.valid && this.tabIndex == 0){
      this.loading = true;
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
        this.loading = false;
      }, error => {
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
  add(){
    if(this.formFilter.valid){
      this.Form.forms.patchValue({
        idunit: this.formFilter.value.idunit,
        kdtahap: this.formFilter.value.kdtahap,
        idxkode: this.formFilter.value.idxkode,
        nodpa: this.unitSelected.kdunit.trim()
      });
      this.Form.title = 'Tambah Data';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  update(e: IDpa){
    this.Form.forms.patchValue({
      iddpa: e.iddpa,
      idunit: e.idunit,
      kdtahap: e.kdtahap,
      idxkode: e.idxkode,
      nodpa: e.nodpa,
      tgldpa: e.tgldpa !== null ? new Date(e.tgldpa) : null,
      tglvalid: e.tglvalid !== null ? new Date(e.tglvalid) : null,
      tglsah: e.tglsah !== null ? new Date(e.tglsah) : null,
      keterangan: e.keterangan,
      nosah: e.nosah
    });
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataClick(e: IDpa){
    this.dataSelected = e;
	}
  delete(e: IDpa){
    this.notif.confir({
			message: `${e.nodpa} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.iddpa).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success(`${e.nodpa} Berhasil Dihapus`);
              if(this.dt) this.dt.reset();
              this.dataSelected = null;
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

  print(e: IDpa, type: string){
    this.reportType=type;
    this.dataSelected= e;
    this.showTanggal.useTgl = true;
		this.showTanggal.useHal = true;
		this.showTanggal.showThis = true;
  }
  callBackTanggal(e: any){
    if (!this.unitSelected) {
      this.notif.warning('SKPD harus dipilih');
    } else {
      if(this.reportType == 'A'){
        let parameterReport = {
          Type: 1,
          FileName: 'Dbaring.rpt',
					Params: {
						'@idunit': this.unitSelected.idunit,
            '@kdtahap': '321',
            '@kdlevel':'6',
						//'@tanggal': e.TGL,
						//'@hal':e.halaman
            }
        };
        this.reportService.execPrint(parameterReport).subscribe((resp) => {
          this.reportService.extractData(resp, 1, `laporan_${this.unitSelected.kdunit}DPA_SKPD`);
        });
      } else if(this.reportType == 'B'){
       
          let parameterReport = {
            Type: 1,
            FileName: 'dparing.rpt', 
            Params: {
            '@kdtahap': '321',
						'@idunit': this.unitSelected.idunit,
            '@kdlevel':'6',
						'@tanggal': e.TGL,
						'@hal':e.halaman
            }
          };
          this.reportService.execPrint(parameterReport).subscribe((resp) => {
            this.reportService.extractData(resp, 1, `laporan_${this.unitSelected.kdunit}DPA_Ringkasan`);
          });
        
      }
    }
	}
  ngOnDestroy(): void {
    this.formFilter.reset(this.initialForm);
    this.uiUnit = {kode:'', nama: ''};
    this.unitSelected = null;
    this.listdata = [];
    this.dataSelected = null;
    this.reportType = '';
  }
}
