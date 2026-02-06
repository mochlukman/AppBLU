import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent, SelectItem } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree2 } from 'src/app/core/interface/iglobal';
import { IJkinkeg } from 'src/app/core/interface/ijkinkeg';
import { IKinkeg } from 'src/app/core/interface/ikinkeg';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { JkinkegService } from 'src/app/core/services/jkinkeg.service';
import { KinkegService } from 'src/app/core/services/kinkeg.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookKegunitTreeComponent } from 'src/app/shared/lookups/look-kegunit-tree/look-kegunit-tree.component';
import { KinkegSubFormComponent } from './kinkeg-sub-form/kinkeg-sub-form.component';

@Component({
  selector: 'app-kinkeg-sub',
  templateUrl: './kinkeg-sub.component.html',
  styleUrls: ['./kinkeg-sub.component.scss']
})
export class KinkegSubComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree2;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  totalRecords: number;
  indexTab: number = 0;
  formFilter: FormGroup;
  initialForm: any;
  listJkinkeg: SelectItem[] = [];
  jkinkegSelected: any;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild(LookKegunitTreeComponent, { static: true }) Kegiatan: LookKegunitTreeComponent;
  @ViewChild(KinkegSubFormComponent, { static: true }) Form: KinkegSubFormComponent;
  @ViewChild('dt', { static: false }) dt: any;
  isvalid: boolean = false;
  constructor(
    private auth: AuthenticationService,
    private service: KinkegService,
    private notif: NotifService,
    private fb: FormBuilder,
    private jkinkeg: JkinkegService,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = { kode: '', nama: '' };
    this.service._tabIndex.subscribe(resp => this.indexTab = resp);
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idkegunit: [0, [Validators.required, Validators.min(1)]],
      kdjkk: ['', Validators.required],
      kdtahap: '321'
    });
    this.initialForm = this.formFilter.value;
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
    this.getJkinkeg();
  }
  getJkinkeg() {
    this.listJkinkeg = [
      { label: 'Pilih', value: null }
    ];
    this.jkinkeg.gets()
      .subscribe(resp => {
        let temp: IJkinkeg[] = [];
        if (resp.length > 0) {
          temp = resp;
          temp.forEach(e => {
            this.listJkinkeg.push({ label: `${e.kdjkk.trim()} : ${e.urjkk.trim()}`, value: e.kdjkk.trim() })
          });
        }
      });
  }
  changeJkinkeg(e: any) {
    if (e.value) {
      this.formFilter.patchValue({
        kdjkk: e.value
      });
      if (this.dt) this.dt.reset();
    } else {
      this.formFilter.patchValue({
        kdjkk: '',
      });
      this.notif.warning('Pilih Indikator');
    }
  }
  lookDaftunit() {
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit) {
    this.unitSelected = e;
    this.uiUnit = { kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit };
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idkegunit: 0
    });
    this.uiKeg = {kode : '', nama: ''};
    this.kegSelected = null;
    this.listdata = [];
    if (this.dt) this.dt.reset();
  }
  lookKegiatan() {
    if (this.unitSelected) {
      this.Kegiatan.title = 'Pilih Sub Kegiatan';
      this.Kegiatan._idunit = this.formFilter.value.idunit;
      this.Kegiatan._kdtahap = this.formFilter.value.kdtahap;
      this.Kegiatan._type = 'subkegiatan';
      this.Kegiatan.get();
      this.Kegiatan.showThis = true;
    } else {
      this.notif.warning('Pilih SKPD');
    }

  }
  callbackKegiatan(e: ILookupTree2) {
    this.kegSelected = e;
    this.formFilter.patchValue({
      idkegunit: this.kegSelected.data_id
    });
    this.uiKeg = { kode: e.data_kode, nama: e.data_nama };
    if (this.dt) this.dt.reset();
  }
  gets(event: LazyLoadEvent) {
    if (this.formFilter.valid && this.indexTab == 1) {
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdtahap = this.formFilter.value.kdtahap;
      this.service._idkegunit = this.formFilter.value.idkegunit;
      this.service._kdjkk = this.formFilter.value.kdjkk;
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.loading = false;
        this.isvalid = resp.isvalid;
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
    if (e.added || e.edited) {
      if (this.dt) this.dt.reset();
    }
  }
  add() {
    if (this.formFilter.valid) {
      this.Form.title = 'Tambah Kinerja Sub Kegiatan';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idkegunit: this.formFilter.value.idkegunit,
        kdjkk: this.formFilter.value.kdjkk
      });
      this.Form.showThis = true;
    }
  }
  edit(e: IKinkeg) {
    this.Form.forms.patchValue({
      idkinkeg: e.idkinkeg,
      idkegunit: e.idkegunit,
      kdjkk: e.kdjkk,
      nomor: e.nomor,
      tolokur: e.tolokur,
      target: e.target,
      satuan: e.satuan,
      keterangan: e.keterangan,
    });
    this.Form.title = 'Ubah Kinerja Sub Kegiatan';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IKinkeg) {
    this.notif.confir({
      message: `${e.nomor} - ${e.keterangan} Akan Dihapus ?`,
      accept: () => {
        this.service.delete(e.idkinkeg).subscribe(
          (resp) => {
            if (resp.ok) {
              this.notif.success('Data berhasil dihapus');
              if (this.dt) this.dt.reset();
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
  print(e: IKinkeg) { }
  ngOnDestroy(): void {
    this.listdata = [];
    this.totalRecords = 0;
    this.unitSelected = null;
    this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = { kode: '', nama: '' };
    this.unitSelected = null;
    this.kegSelected = null;
    this.listJkinkeg = [];
    this.jkinkegSelected = null;
    this.formFilter.reset(this.initialForm);
  }
}
