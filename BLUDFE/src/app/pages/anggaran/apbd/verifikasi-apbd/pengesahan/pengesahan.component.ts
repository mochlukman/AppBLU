import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IRkasah } from 'src/app/core/interface/irkasah';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { RkaMainService } from 'src/app/core/services/rka-main.service';
import { RkasahService } from 'src/app/core/services/rkasah.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { PengesahanFormComponent } from './pengesahan-form/pengesahan-form.component';

@Component({
  selector: 'app-pengesahan',
  templateUrl: './pengesahan.component.html',
  styleUrls: ['./pengesahan.component.scss']
})
export class PengesahanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IRkasah[] = [];
  totalRecords: number;
  dataSelected: IRkasah = null;
  formFilter: FormGroup;
  initialForm: any;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild('dt', { static: false }) dt: any;
  indexTab = 0;
  @ViewChild(PengesahanFormComponent, {static: true}) Form: PengesahanFormComponent;
  constructor(
    private auth: AuthenticationService,
    private service: RkasahService,
    private notif: NotifService,
    private fb: FormBuilder,
    private mainService: RkaMainService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = { kode: '', nama: '' };
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: '321'
    });
    this.mainService._tabIndex.subscribe(resp => {
      this.indexTab = resp;
    });
  }
  ngOnInit() {
  }
  lookDaftunit() {
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit) {
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    this.dataSelected = null;
    if (this.dt) this.dt.reset();
  }
  gets(event: LazyLoadEvent) {
    if (this.formFilter.valid && this.indexTab == 3) {
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdtahap = this.formFilter.value.kdtahap;
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          for (var i = 0; i < error.error.error.length; i++) {
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
    }
  }
  callback(e: any) {
    if(e.added){
      if(this.dt) this.dt.reset();
      this.notif.success('Data Berhasil Ditambahkan');
    } else if(e.edited){
      if(typeof e.data === 'object' && e.data !== null){
        this.listdata.map(m => {
          if(m.idrkasah == e.data.idrkasah){
            m.nippeg = e.data.nippeg;
            m.namapeg = e.data.namapeg;
            m.uraian = e.data.uraian;
            m.tglsah = e.data.tglsah;
          }
        });
      }
      this.notif.success('Data Berhasil Diubah');
    }
  }
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idunit: this.formFilter.value.idunit,
      kdtahap: this.formFilter.value.kdtahap
    });
    this.Form.showThis = true;
  }
  update(e: IRkasah){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idrkasah : e.idrkasah,
      idunit :e.idunit,
      idpeg :e.idpeg,
      kdtahap : e.kdtahap,
      uraian : e.uraian,
      tglsah: e.tglsah != null ? new Date(e.tglsah) : null,
    });
    if(e.idpegNavigation){
      this.Form.uiTapd = {kode : e.idpegNavigation.nip, nama: e.idpegNavigation.nama};
      this.Form.tapdSelected = e.idpegNavigation;
    }
    this.Form.showThis = true;
  }
  delete(e: IRkasah){
    this.notif.confir({
			message: `${e.nippeg} - ${e.namapeg} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idrkasah).subscribe(
					(resp) => {
						if (resp.ok) {
              if(this.dt) this.dt.reset();
              this.notif.success('Data Berhasil Dihapus');
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.dataSelected = null;
    this.totalRecords = 0;
  }
}