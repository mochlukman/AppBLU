import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPegawai } from 'src/app/core/interface/ipegawai';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { PegawaiService } from 'src/app/core/services/pegawai.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { PegawaiFormComponent } from './pegawai-form/pegawai-form.component';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-pegawai',
  templateUrl: './pegawai.component.html',
  styleUrls: ['./pegawai.component.scss']
})
export class PegawaiComponent implements OnInit, OnDestroy {
  title: string = '';
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IPegawai[] = [];
  totalRecords: number = 0;
  dataSelected: IPegawai = null;
  @ViewChild('dt', { static: false }) dt: any;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild(PegawaiFormComponent, { static: true }) Form: PegawaiFormComponent;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: PegawaiService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = { kode: '', nama: '' };
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
    if (this.userInfo.Idunit != 0) {
      this.unitService.get(this.userInfo.Idunit).subscribe(resp => {
        this.callbackDaftunit(resp);
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
  ngOnInit() {
  }
  lookDaftunit() {
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callbackDaftunit(e: IDaftunit) {
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    this.dataSelected = null;
    this.listdata = [];
    if (this.dt) this.dt.reset();
  }
  callback(e: any) {
    if (e.added || e.edited) {
      if (this.dt) this.dt.reset();
    }
    this.dataSelected = null;
  }
  gets(event: LazyLoadEvent) {
    if (this.formFilter.valid) {
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
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
  add() {
    if (this.formFilter.valid) {
      this.Form.forms.patchValue({
        idunit: this.formFilter.value.idunit
      });
      this.Form.title = 'Tambah Data';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  edit(e: IPegawai) {
    this.Form.forms.patchValue({
      idpeg: e.idpeg,
      nip: e.nip,
      idunit: e.idunit,
      kdgol: e.kdgol,
      nama: e.nama,
      alamat: e.alamat,
      jabatan: e.jabatan,
      pddk: e.pddk,
      npwp: e.npwp,
      staktif: e.staktif,
      stvalid: e.stvalid,
    });
    if(e.kdgolNavigation){
      this.Form.golselected = e.kdgolNavigation;
    }
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IPegawai) {
    this.notif.confir({
    	message: `${e.nama} Akan Dihapus ?`,
    	accept: () => {
    		this.service.delete(e.idpeg).subscribe(
    			(resp) => {
    				if (resp.ok) {
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.dataSelected = null;
    this.totalRecords = 0;
    if (this.formFilter) this.formFilter.reset(this.initialForm);
  }
}
