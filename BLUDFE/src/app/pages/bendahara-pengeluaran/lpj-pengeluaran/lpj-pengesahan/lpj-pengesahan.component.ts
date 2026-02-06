import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ILpj } from 'src/app/core/interface/ilpj';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { LpjMainService } from 'src/app/core/services/lpj-main.service';
import { LpjService } from 'src/app/core/services/lpj.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { LpjPengesahanFormComponent } from './lpj-pengesahan-form/lpj-pengesahan-form.component';

@Component({
  selector: 'app-lpj-pengesahan',
  templateUrl: './lpj-pengesahan.component.html',
  styleUrls: ['./lpj-pengesahan.component.scss']
})
export class LpjPengesahanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  indexSubs : Subscription;
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
  @ViewChild(LpjPengesahanFormComponent, {static: true}) Form: LpjPengesahanFormComponent;
  constructor(
    private mainService: LpjMainService,
    private auth: AuthenticationService,
    private notif: NotifService,
    private fb: FormBuilder,
    private service: LpjService) { 
      this.formFilter = this.fb.group({
        idunit: [0, [Validators.required, Validators.min(1)]],
        idbend: [0, [Validators.required, Validators.min(1)]]
      });
      this.initialForm = this.formFilter.value;
      this.userInfo = this.auth.getTokenInfo();
      this.uiUnit = {kode: '', nama: ''};
      this.uiBend = {kode: '', nama: ''};
      this.indexSubs = this.mainService._tabIndex.subscribe(resp => {
        if(resp === 1){}
        else {this.ngOnDestroy()}
      });
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
      this.Bendahara.gets(this.unitSelected.idunit,'02,12');
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
    if(this.formFilter.valid){
      this.loading = true;
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service.getPaging(this.formFilter.value.idunit, this.formFilter.value.idbend).subscribe(resp => {
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
    if(e.added || e.edited){
      if(this.dt) this.dt.reset();
    }
    this.dataSelected = null;
  }
  edit(e: ILpj){
    this.Form.forms.patchValue({
      idlpj : e.idlpj,
      idunit : e.idunit,
      nolpj : e.nolpj,
      idttd : e.idttd,
      idxkode : e.idxkode,
      idbend : e.idbend,
      tgllpj : e.tgllpj != null ? new Date(e.tgllpj) : '',
      tglbuku: e.tglbuku != null ? new Date(e.tglbuku) : '',
      nosah: e.nosah,
      tglvalid: e.tglvalid != null ? new Date(e.tglvalid) : null,
      keterangan: e.keterangan,
      tglsah: e.tglsah != null ? new Date(e.tglsah) : null,
      verifikasi: e.verifikasi,
    });
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Pengesahan Data';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ILpj){
    let postBody = {
      idlpj: e.idlpj,
      idunit: e.idunit,
      nolpj: e.nolpj,
      idxkode: e.idxkode,
      kdstatus: e.kdstatus,
      tglvalid: null,
      verifikasi: null
    };
    this.notif.confir({
      message: `Batalkan Pengesahan ?`,
      accept: () => {
        this.service.pengesahan(postBody).subscribe(
          (resp) => {
            if (resp.ok) {
              this.callback({
                edited: true,
                data: resp.body
              });
              this.notif.success('Pengesahan Berhasil Dibatalkan');
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
  dataKlick(e: ILpj){
    this.dataSelected = e;
	}
  print(e: ILpj){
    
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
