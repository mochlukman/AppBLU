import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { IRkar } from 'src/app/core/interface/irkar';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { RkaMainService } from 'src/app/core/services/rka-main.service';
import { RkarService } from 'src/app/core/services/rkar.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LookKegunitTreeComponent } from 'src/app/shared/lookups/look-kegunit-tree/look-kegunit-tree.component';
import { LookMkegiatanByKegunitComponent } from 'src/app/shared/lookups/look-mkegiatan-by-kegunit/look-mkegiatan-by-kegunit.component';
import { RkardanaComponent } from './rkardana/rkardana.component';
import { TapdrComponent } from './tapdr/tapdr.component';

@Component({
  selector: 'app-belanja',
  templateUrl: './belanja.component.html',
  styleUrls: ['./belanja.component.scss']
})
export class BelanjaComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IRkar[] = [];
  totalRecords: number;
  totalNilai: number = 0;
  dataSelected: IRkar = null;
  formFilter: FormGroup;
  initialForm: any;
  nilaiInit: number;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild('dt', { static: false }) dt: any;
  indexTab = 0;
  @ViewChild(TapdrComponent, {static: true}) Tapd: TapdrComponent;
  @ViewChild(LookMkegiatanByKegunitComponent, {static: true}) Kegiatan : LookMkegiatanByKegunitComponent;
  @ViewChild(RkardanaComponent, {static: true}) SumberDana : RkardanaComponent;
  constructor(
    private auth: AuthenticationService,
    private service: RkarService,
    private notif: NotifService,
    private fb: FormBuilder,
    private mainService: RkaMainService,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: '321',
      idkeg: [0, [Validators.required, Validators.min(1)]]
    });
    this.mainService._tabIndex.subscribe(resp => {
      this.indexTab = resp;
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
  lookKegiatan(){
    if(this.unitSelected){
      this.Kegiatan.title = 'Pilih Kegiatan';
      this.Kegiatan._idunit = this.formFilter.value.idunit;
      this.Kegiatan._kdtahap = this.formFilter.value.kdtahap;
      this.Kegiatan._type = 'subkegiatan';
      this.Kegiatan.get();
      this.Kegiatan.showThis = true;
    } else {
      this.notif.warning('Pilih SKPD');
    }
    
  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
    this.formFilter.patchValue({
      idkeg: this.kegSelected.data_id
    });
    this.dataSelected = null;
    if (this.dt) this.dt.reset();
  }
  gets(event: LazyLoadEvent) {
    if (this.formFilter.valid && this.indexTab == 1) {
      this.totalNilai = 0;
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdtahap = this.formFilter.value.kdtahap;
      this.service._idkeg = this.formFilter.value.idkeg;
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
          if (resp.optionalResult) {
            this.totalNilai = resp.optionalResult.totalNilai;
          }
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
    if (e.added) {
      if (this.dt) this.dt.reset();
    }
    this.dataSelected = null;
  }
  subTotal(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => total += +f.nilai);
		}
		return total;
  }
  dataKlick(e: IRkar) {
    this.dataSelected = e;
  }
  getSumberDana(e: IRkar){
    this.SumberDana.rkaSelected = e;
    this.SumberDana.title = 'Sumber Dana';
    this.SumberDana.showThis = true;
  }
  listVerifikasi(e: IRkar){
    this.Tapd.rkaSelected = e;
    this.Tapd.title = "Verifikasi TAPD";
    this.Tapd.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.uiKeg = {kode: '', nama: ''};
    this.unitSelected = null;
    this.dataSelected = null;
    this.totalRecords = 0;
    this.totalNilai = 0;
  }
}