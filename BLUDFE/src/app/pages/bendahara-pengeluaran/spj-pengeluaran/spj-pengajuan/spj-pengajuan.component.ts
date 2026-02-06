import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpj } from 'src/app/core/interface/ispj';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpjService } from 'src/app/core/services/spj.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { SpjPengajuanFormComponent } from './spj-pengajuan-form/spj-pengajuan-form.component';

@Component({
  selector: 'app-spj-pengajuan',
  templateUrl: './spj-pengajuan.component.html',
  styleUrls: ['./spj-pengajuan.component.scss']
})
export class SpjPengajuanComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  formFilter: FormGroup;
  initialForm: any;
  listdata: any[] = [];
  totalRecords: number;
  dataSelected: any;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(SpjPengajuanFormComponent, {static: true}) Form: SpjPengajuanFormComponent;
  constructor(
    private auth: AuthenticationService,
    private notif: NotifService,
    private fb: FormBuilder,
    private service: SpjService) { 
      this.formFilter = this.fb.group({
        idunit: [0, [Validators.required, Validators.min(1)]],
        idbend: [0, [Validators.required, Validators.min(1)]],
        kdstatus: ['42,43']
      });
      this.initialForm = this.formFilter.value;
      this.userInfo = this.auth.getTokenInfo();
      this.uiUnit = {kode: '', nama: ''};
      this.uiBend = {kode: '', nama: ''};
    }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex != 0){
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
    this.bendSelected = null;
    this.dataSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idbend: 0
    });
    this.dataSelected = null;
    this.listdata = [];
    this.totalRecords = 0;
  }
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.formFilter.value.idunit,'02,12');
      this.Bendahara.showThis = true;
    } else {
      this.notif.warning('Pilih Unit');
    }
    
  }
  callBackBendahara(e: Ibend){
    this.bendSelected = e;
    this.uiBend = {
      kode: this.bendSelected.idpegNavigation.nip, 
      nama: this.bendSelected.idpegNavigation.nama + ',' + this.bendSelected.jnsbendNavigation.jnsbend.trim() + ' - ' + this.bendSelected.jnsbendNavigation.uraibend.trim()
    };
    this.formFilter.patchValue({
      idbend: this.bendSelected.idbend
    });
    this.dataSelected = null;
    if(this.dt) this.dt.reset();
  }
  loadCarsLazy(event: LazyLoadEvent){
    if(this.formFilter.valid && this.tabIndex == 0){
      this.loading = true;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service._idbend = this.formFilter.value.idbend;
      this.service.getPaging().subscribe(resp => {
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
  callback(e: any){
    if (e.added) {
      if (this.dt) this.dt.reset();
    } else if(e.edited){
      this.listdata.splice(this.listdata.findIndex(i => i.idspj === e.data.idspj), 1, e.data);
    }
    this.dataSelected = null;
  }
  add(){
    if(this.formFilter.valid){
      this.Form.title = 'Tambah Data';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.formFilter.value.idunit,
        idbend : this.formFilter.value.idbend
      });
      this.Form.unitSelected = this.unitSelected;
      this.Form.showThis = true;
    }
  }
  edit(e: ISpj){
    this.Form.forms.patchValue({
      idspj : e.idspj,
      idunit : e.idunit,
      nospj : e.nospj,
      idttd : e.idttd,
      idxkode : e.idxkode,
      idbend : e.idbend,
      kdstatus : e.kdstatus,
      tglspj : e.tglspj != null ? new Date(e.tglspj) : null,
      tglbuku: e.tglbuku != null ? new Date(e.tglbuku) : null,
      nosah: e.nosah,
      tglvalid: e.tglvalid != null ? new Date(e.tglvalid) : null,
      keterangan: e.keterangan,
    });
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISpj){
    this.notif.confir({
			message: `${e.nospj} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idspj).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success(`${e.nospj} Berhasil Dihapus`);
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
  dataKlick(e: ISpj){
    this.dataSelected = e;
	}
  print(e: ISpj){
    
  }
  ngOnDestroy(): void{
    this.unitSelected = null;
    this.bendSelected = null;
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
    this.loading = false;
    this.listdata = [];
    this.dataSelected = null;
  }
}
