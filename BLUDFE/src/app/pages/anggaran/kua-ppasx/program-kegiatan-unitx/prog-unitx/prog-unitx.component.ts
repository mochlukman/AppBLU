import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPgrmunit } from 'src/app/core/interface/ipgrmunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { PgrmunitService } from 'src/app/core/services/pgrmunit.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { ProgUnitFormxComponent } from '../prog-unit-formx/prog-unit-formx.component';

@Component({
  selector: 'app-prog-unitx',
  templateUrl: './prog-unitx.component.html',
  styleUrls: ['./prog-unitx.component.scss']
})
export class ProgUnitxComponent implements OnInit, OnDestroy {
  title: string = '';
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IPgrmunit[] = [];
  dataSelected: IPgrmunit = null;
  formFilter: FormGroup;
  initialForm: any;
  totalRecords: number;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(ProgUnitFormxComponent, {static: true}) Form: ProgUnitFormxComponent;
  isvalid: boolean = false;
  constructor(
    private global: GlobalService,
    private service: PgrmunitService,
    private auth: AuthenticationService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdtahap: ['341', Validators.required]
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
    this.listdata = [];
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit
    });
    if(this.dt) this.dt.reset();
  }
  callback(e: any){
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
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
      this.service._kdtahap = this.formFilter.value.kdtahap;
      this.service.paging().subscribe(resp => {
        if(resp.totalrecords > 0){
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
        } else {
          this.notif.info('Data Tidak Tersedia');
        }
        this.isvalid = resp.isvalid;
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
  add(){
    this.Form.title = 'Tambah Data';
    this.Form.mode = 'add';
    this.Form._idurus = this.unitSelected.idurus;
    this.Form.forms.patchValue({
      idunit: this.unitSelected.idunit
    });
    this.Form.showThis = true;
  }
  edit(e: IPgrmunit){
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form._idurus = this.unitSelected.idurus;
    this.Form.forms.patchValue({
      idpgrmunit : e.idpgrmunit,
      idunit : e.idunit,
      kdtahap : e.kdtahap,
      idprgrm : e.idprgrm,
      target : e.target,
      targetx : e.pgrmunitx ? e.pgrmunitx.target : '',
      sasaran : e.sasaran,
      indikator : e.indikator,
      tglvalid: e.tglvalid != null ? new Date(e.tglvalid) : null
    });
    if(e.idprgrmNavigation){
      this.Form.uiMpgrm = {kode: e.idprgrmNavigation.nuprgrm.trim(), nama: e.idprgrmNavigation.nmprgrm.trim()};
    }
    this.Form.showThis = true;
  }
  delete(e: IPgrmunit){
    this.notif.confir({
			message: `${e.idprgrmNavigation.nmprgrm} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idpgrmunit).subscribe(
					(resp) => {
						if (resp.ok) {
              if(this.dt) this.dt.reset();
              this.notif.success('Data berhasil dihapus');
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
  print(e: IPgrmunit){}
  dataKlick(e: IPgrmunit){
    this.dataSelected = e;
  }
  ngOnDestroy(): void{
    this.listdata = [];
    this.formFilter.reset(this.initialForm);
    this.dataSelected = null;
    this.totalRecords = 0;
    this.isvalid = false;
  }
}
