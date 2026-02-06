import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IRkab } from 'src/app/core/interface/irkab';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { RkaMainService } from 'src/app/core/services/rka-main.service';
import { RkabService } from 'src/app/core/services/rkab.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { TapdbxComponent } from './tapdbx/tapdbx.component';

@Component({
  selector: 'app-pembiayaanx',
  templateUrl: './pembiayaanx.component.html',
  styleUrls: ['./pembiayaanx.component.scss']
})
export class PembiayaanxComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IRkab[] = [];
  totalRecords: number;
  totalNilai: number = 0;
  dataSelected: IRkab = null;
  formFilter: FormGroup;
  initialForm: any;
  nilaiInit: number;
  @ViewChild(LookDaftunitComponent, { static: true }) Daftunit: LookDaftunitComponent;
  @ViewChild('dt', { static: false }) dt: any;
  indexTab = 0;
  @ViewChild(TapdbxComponent, {static: true}) Tapd: TapdbxComponent;
  constructor(
    private auth: AuthenticationService,
    private service: RkabService,
    private notif: NotifService,
    private fb: FormBuilder,
    private mainService: RkaMainService,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = { kode: '', nama: '' };
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: '341'
    });
    this.mainService._tabIndex.subscribe(resp => {
      this.indexTab = resp;
      if(this.indexTab == 2){
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
    if (this.formFilter.valid && this.indexTab == 2) {
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
  dataKlick(e: IRkab) {
    this.dataSelected = e;
  }
  listVerifikasi(e: IRkab){
    this.Tapd.rkaSelected = e;
    this.Tapd.title = "Verifikasi TAPD";
    this.Tapd.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.uiUnit = { kode: '', nama: '' };
    this.unitSelected = null;
    this.dataSelected = null;
    this.totalRecords = 0;
    this.totalNilai = 0;
  }
}