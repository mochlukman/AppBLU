import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISp2dNtpn } from 'src/app/core/interface/isp2d-ntpn';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Sp2dNtpnService } from 'src/app/core/services/sp2d-ntpn.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { Sp2dNtpnFormComponent } from './sp2d-ntpn-form/sp2d-ntpn-form.component';

@Component({
  selector: 'app-sp2d-ntpn',
  templateUrl: './sp2d-ntpn.component.html',
  styleUrls: ['./sp2d-ntpn.component.scss']
})
export class Sp2dNtpnComponent implements OnInit, OnChanges, OnDestroy {
  title: string = '';
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  totalRecords: number;
  formFilter: FormGroup;
  initialForm: any;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(Sp2dNtpnFormComponent, {static: true}) Form : Sp2dNtpnFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private global: GlobalService,
    private auth: AuthenticationService,
    private service: Sp2dNtpnService,
    private notif: NotifService,
    private fb: FormBuilder
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnChanges(changes: SimpleChanges): void {

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
    if(this.dt) this.dt.reset();
  }
  gets(event: LazyLoadEvent){
    if(this.formFilter.valid){
      this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
      this.service.paging().subscribe(resp => {
        if(resp.totalrecords > 0){
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
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
    } else {
      this.notif.warning('Pilih Unit Organisasi');
    }
  }

  callback(e: any){
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
  }
  add(){
    if(this.unitSelected){
      this.Form.title = 'Tambah Data';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.formFilter.value.idunit,
      });
      this.Form.showThis = true;
    }
  }
  print(e: ISp2dNtpn){}
  edit(e: ISp2dNtpn){
    this.Form.forms.patchValue({
      idntpn : e.idntpn,
      idunit: e.idunit,
      ntpn : e.ntpn,
      tglntpn : e.tglntpn ?  new Date(e.tglntpn) : null,
      idsp2d : e.idsp2d,
      idbilling : e.idbilling,
    });
    if(e.idsp2dNavigation){
      this.Form.sp2dSelected = e.idsp2dNavigation;
      this.Form.uiSp2d = {kode: e.idsp2dNavigation.nosp2d, nama: e.idsp2dNavigation.keperluan};
    }
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISp2dNtpn){
    this.notif.confir({
			message: `${e.ntpn} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idntpn).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idntpn !== e.idntpn);
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

  }
}
