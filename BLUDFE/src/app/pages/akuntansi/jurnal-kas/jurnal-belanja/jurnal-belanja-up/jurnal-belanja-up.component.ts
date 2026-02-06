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
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { JurnalBelanjaUpFormComponent } from './jurnal-belanja-up-form/jurnal-belanja-up-form.component';

@Component({
  selector: 'app-jurnal-belanja-up',
  templateUrl: './jurnal-belanja-up.component.html',
  styleUrls: ['./jurnal-belanja-up.component.scss']
})
export class JurnalBelanjaUpComponent implements OnInit,  OnDestroy {
  @Input() tabIndex = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  formFilter: FormGroup;
  initialForm: any;
  listdata: any[] = [];
  totalRecords: number;
  dataSelected: any;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(JurnalBelanjaUpFormComponent, {static: true}) Form: JurnalBelanjaUpFormComponent;
  constructor(
    private auth: AuthenticationService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService,
    private service: SpjService) { 
      this.formFilter = this.fb.group({
        idunit: [0, [Validators.required, Validators.min(1)]],
        idbend: 0,
        kdstatus: ['42,43']
      });
      this.initialForm = this.formFilter.value;
      this.userInfo = this.auth.getTokenInfo();
      this.uiUnit = {kode: '', nama: ''};
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
  /*ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex != 0){
      this.ngOnDestroy();
    }
  }*/

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
    this.totalRecords = 0;
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
      valid: e.valid
    });
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Validasi Jurnal';
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
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
    this.loading = false;
    this.listdata = [];
    this.dataSelected = null;
  }
}
