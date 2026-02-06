import { Component, Input, OnDestroy, OnInit,  SimpleChanges,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITbp } from 'src/app/core/interface/itbp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TbpService } from 'src/app/core/services/tbp.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookBendaharaComponent } from 'src/app/shared/lookups/look-bendahara/look-bendahara.component';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { PeltuBpToBpFormComponent } from './peltu-bp-to-bp-form/peltu-bp-to-bp-form.component';

@Component({
  selector: 'app-peltu-bp-to-bp',
  templateUrl: './peltu-bp-to-bp.component.html',
  styleUrls: ['./peltu-bp-to-bp.component.scss']
})
export class PeltuBpToBpComponent implements OnInit, OnDestroy {
  @Input() tabIndex: number = 0;
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiBend: IDisplayGlobal;
  bendSelected: Ibend;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: ITbp[] = [];
  dataSelected: ITbp = null;
  indexSubs : Subscription;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(LookBendaharaComponent, {static: true}) Bendahara : LookBendaharaComponent;
  @ViewChild(PeltuBpToBpFormComponent, {static: true}) Form: PeltuBpToBpFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  formFilter: FormGroup;
  initialForm: any;
  constructor(
    private auth: AuthenticationService,
    private service: TbpService,
    private notif: NotifService,
    private fb: FormBuilder,
    private unitService: DaftunitService
  ){
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiBend = {kode: '', nama: ''};
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      if(resp === 2){
        // console.log('BP-BP');
      }
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
  lookDaftunit(){
    this.Daftunit.title = 'Pilih Unit Organisasi';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.listdata = [];
  }
  
  lookBendahara(){
    if(this.unitSelected){
      this.Bendahara.title = 'Pilih Bendahara';
      this.Bendahara.gets(this.unitSelected.idunit,'02');
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
    this.get();
  }
  get(){
    this.dataSelected = null;
    this.listdata = [];
    if(this.unitSelected && this.bendSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit,'55', 6, this.bendSelected.idbend)
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
      this.notif.warning('Pilih Unit Organisasi dan Bendaraha');
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idtbp === e.data.idtbp);
      this.listdata = this.listdata.filter(f => f.idtbp != e.data.idtbp);
      this.listdata.splice(index, 0, e.data);
    }
    this.dataSelected = null;
  }
  add(){
    if(this.unitSelected && this.bendSelected){
      this.Form.title = 'Tambah Pengajuan';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.unitSelected.idunit,
        idbend1: this.bendSelected.idbend,
        idxkode: 6,
        jabbend: this.bendSelected.jabbend
      });
      this.Form.unitSelected = this.unitSelected;
      this.Form.showThis = true;
    }
  }
  print(e: ITbp){}
  update(e: ITbp){
    this.Form.forms.patchValue({
      idtbp : e.idtbp,
      idunit : e.idunit,
      idbend1 : e.idbend1,
      notbp : e.notbp,
      kdstatus : e.kdstatus,
      idxkode: e.idxkode,
      tgltbp : e.tgltbp ? new Date(e.tgltbp) : null,
      uraitbp : e.uraitbp,
      alamat : e.alamat,
      penyetor: e.penyetor
    });
    this.Form.unitSelected = this.unitSelected;
    this.Form.title = 'Ubah Pengajuan';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ITbp){
    this.notif.confir({
			message: `${e.notbp} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idtbp).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idtbp !== e.idtbp);
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
  dataKlick(e: ITbp){
    if(this.unitSelected && this.bendSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit & Bendahara');
    }
	}
  ngOnDestroy(): void{
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    this.bendSelected = null;
    this.uiBend = {kode: '', nama: ''};
    this.indexSubs.unsubscribe();
  }
}
