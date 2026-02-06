import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISts } from 'src/app/core/interface/ists';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsService } from 'src/app/core/services/sts.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { TransferAntarRekeningFormComponent } from './transfer-antar-rekening-form/transfer-antar-rekening-form.component';

@Component({
  selector: 'app-transfer-antar-rekening',
  templateUrl: './transfer-antar-rekening.component.html',
  styleUrls: ['./transfer-antar-rekening.component.scss']
})
export class TransferAntarRekeningComponent implements OnInit, OnChanges, OnDestroy {
  title: string = '';
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: any[] = [];
  totalRecords: number;
  dataSelected: ISts = null;
  formFilter: FormGroup;
  initialForm: any;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(TransferAntarRekeningFormComponent, {static: true}) Form : TransferAntarRekeningFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private global: GlobalService,
    private auth: AuthenticationService,
    private service: StsService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idxkode: [0],
      kdstatus: ['14', Validators.required]
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
    this.dataSelected = null;
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
      this.service.paging(this.formFilter.value.idunit, this.formFilter.value.kdstatus, this.formFilter.value.idxkode).subscribe(resp => {
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
  dataKlick(e: ISts){
    this.dataSelected = e;
  }
  callback(e: any){
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
    this.dataSelected = null;
  }
  add(){
    if(this.unitSelected){
      this.Form.title = 'Tambah Data';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.formFilter.value.idunit,
        idxkode: this.formFilter.value.idxkode,
        kdstatus: this.formFilter.value.kdstatus
      });
      this.Form.unitSelected = this.unitSelected;
      this.Form.showThis = true;
    }
  }
  print(e: ISts){}
  edit(e: ISts){
    this.Form.forms.patchValue({
      idsts : e.idsts,
      idunit : e.idunit,
      nosts : e.nosts,
      kdstatus : e.kdstatus,
      idxkode : e.idxkode,
      tglsts : e.tglsts ?  new Date(e.tglsts) : null,
      tglvalid: e.tglvalid ?  new Date(e.tglvalid) : null,
      nobbantu: e.nobbantu,
      uraian : e.uraian
    });
    this.Form.unitSelected = this.unitSelected;
    if(e.nobbantuNavigation){
      this.Form.budSelected = e.nobbantuNavigation;
      this.Form.uiBud = {kode: e.nobbantuNavigation.nobbantu, nama: e.nobbantuNavigation.nmbkas};
    }
    this.Form.title = 'Ubah Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISts){
    this.notif.confir({
			message: `${e.nosts} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idsts).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idsts !== e.idsts);
              this.notif.success('Data berhasil dihapus');
              this.dataSelected = null;
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
