import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { IPanjar } from 'src/app/core/interface/ipanjar';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { PanjarService } from 'src/app/core/services/panjar.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { PanjarFormComponent } from './panjar-form/panjar-form.component';

@Component({
  selector: 'app-panjar',
  templateUrl: './panjar.component.html',
  styleUrls: ['./panjar.component.scss']
})
export class PanjarComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IPanjar[] = [];
  dataSelected: IPanjar = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(PanjarFormComponent, {static: true}) Form: PanjarFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: PanjarService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.formFilter = this.fb.group({
      idunit: [0, [Validators.required, Validators.min(1)]],
      kdstatus: '31,32',
      idxkode: 2,
      idbend: [0, [Validators.required, Validators.min(1)]]
    });
    this.initialForm = this.formFilter.value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
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
      idunit: this.unitSelected.idunit,
      idbend: 0
    });
    this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.listdata = [];
  }
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.formFilter.value.idunit,'02');
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
    if(this.formFilter.valid && this.tabIndex == 0){
      this.dataSelected = null;
      this.listdata = [];
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service._idunit = this.formFilter.value.idunit;
      this.service._idbend = this.formFilter.value.idbend;
      this.service._idxkode = this.formFilter.value.idxkode;
      this.service._kdstatus = this.formFilter.value.kdstatus;
      this.service.gets()
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
    }
  }
  callback(e: any){
    if(e.added || e.edited){
      this.get();
    }
    this.dataSelected = null;
  }
  dataKlick(e: IPanjar){
    if(this.unitSelected && this.bendSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit & Bendahara');
    }
	}
  add(){
    if(this.unitSelected && this.bendSelected){
      this.Form.title = 'Tambah Panjar';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.unitSelected.idunit,
        idbend : this.bendSelected.idbend,
        idpeg: this.bendSelected.idpeg,
        jabbend: this.bendSelected.jabbend
      });
      this.Form.unitSelected = this.unitSelected;
      this.Form.showThis = true;
      console.log(this.bendSelected);
    }
  }
  update(e: IPanjar){
    this.Form.forms.patchValue({
      idpanjar : e.idpanjar,
      idunit : e.idunit,
      nopanjar : e.nopanjar,
      idbend : e.idbend,
      idxkode : e.idxkode,
      kdstatus : e.kdstatus,
      tglpanjar : e.tglpanjar ? new Date(e.tglpanjar) : null,
      uraian : e.uraian,
      referensi: e.referensi,
      idpeg: e.idpeg,
      stbank: e.stbank,
      sttunai: e.sttunai
    });
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Ubah Panjar';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IPanjar){
    this.notif.confir({
			message: `${e.nopanjar} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idpanjar).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idpanjar !== e.idpanjar);
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
  print(data: IPanjar){}
  ngOnDestroy():void {
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    if(this.formFilter) this.formFilter.reset(this.initialForm);
  }
}
