import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISts } from 'src/app/core/interface/ists';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsService } from 'src/app/core/services/sts.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { PengajuanFormComponent } from './pengajuan-form/pengajuan-form.component';

@Component({
  selector: 'app-pengajuan',
  templateUrl: './pengajuan.component.html',
  styleUrls: ['./pengajuan.component.scss']
})
export class PengajuanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: ISts[] = [];
  dataselected: any;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(PengajuanFormComponent, {static: true}) Form: PengajuanFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: StsService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      idbend: [0, [Validators.required, Validators.min(1)]],
      kdstatus: '10,12,18',
      idxkode: 2
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
    this.initialForm = this.formFilter.value;
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
    this.uiBend = {kode: '', nama: ''};
    this.listdata = [];
    this.formFilter.patchValue({
      idunit: this.unitSelected.idunit,
      idbend: 0
    });
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
    this.get();
  }
  get(){
    this.listdata = [];
    this.dataselected = null;
    if(this.formFilter.valid){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.formFilter.value.idunit, this.formFilter.value.idbend, this.formFilter.value.kdstatus, this.formFilter.value.idxkode)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    } else {
      this.notif.warning('Pilih Unit Organisasi dan Bendahara');
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idsts === e.data.idsts);
      this.listdata = this.listdata.filter(f => f.idsts != e.data.idsts);
      this.listdata.splice(index, 0, e.data);
    }
    this.dataselected = null;
  }
  add(){
    if(this.unitSelected && this.bendSelected){
      this.Form.title = 'Tambah Pengembalian Belanja';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.formFilter.value.idunit,
        idbend : this.formFilter.value.idbend,
        idxkode: this.formFilter.value.idxkode,
        idpeg: this.bendSelected.idpeg,
        jabbend: this.bendSelected.jabbend
      });
      this.Form.unitSelected = this.unitSelected;
      this.Form.showThis = true;
    }
  }
  update(e: ISts){
    this.Form.forms.patchValue({
      idsts : e.idsts,
      idunit : e.idunit,
      nosts : e.nosts,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      tglsts : e.tglsts ?  new Date(e.tglsts) : null,
      tglvalid: e.tglvalid ?  new Date(e.tglvalid) : null,
      nobbantu: e.nobbantu,
      uraian : e.uraian,
      nilaiup : e.nilaiup
    });
    this.Form.unitSelected = this.unitSelected;
    if(e.nobbantuNavigation){
      this.Form.budSelected = e.nobbantuNavigation;
      this.Form.uiBud = {kode: e.nobbantuNavigation.nobbantu, nama: e.nobbantuNavigation.nmbkas};
    }
    this.Form.title = 'Ubah Pengembalian Belanja';
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
              if(this.dt) this.dt.reset();
						}
            this.dataselected = null;
					}, (error) => {
            this.dataselected = null;
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
  print(data: ISts){}
  detail(e: any){
    this.dataselected = e;
  }
  ngOnDestroy():void {
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.formFilter.reset(this.initialForm);
  }
}