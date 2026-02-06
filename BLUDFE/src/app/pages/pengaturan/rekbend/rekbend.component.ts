import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BendService } from 'src/app/core/services/bend.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { FormRekbendComponent } from './form-rekbend/form-rekbend.component';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-rekbend',
  templateUrl: './rekbend.component.html',
  styleUrls: ['./rekbend.component.scss']
})
export class RekbendComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: Ibend[] = [];
  cols: any[] = [];
  dataSelected: Ibend = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(FormRekbendComponent, {static: true}) Form: FormRekbendComponent;
  title: string = '';
  constructor(
    private auth: AuthenticationService,
    private service: BendService,
    private notif: NotifService,
    private global: GlobalService
  ) {
    this.global._title.subscribe((s) => this.title = s);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.cols = [
      {field: 'idpegNavigation.nip'},
      {field: 'idpegNavigation.nama'},
      {field: 'jnsbendNavigation.uraibend'},
      {field: 'idbankNavigation.akbank'},
      {field: 'rekbend'},
      {field: 'pilih'}
		];
  }
  ngOnInit() {
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callbackDaftunit(e: IDaftunit){
    this.unitSelected = e;
    this.uiUnit = {kode: this.unitSelected.kdunit, nama: this.unitSelected.nmunit};
    this.dataSelected = null;
    this.listdata = [];
    this.getDatas();
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idbend === e.data.idbend);
      this.listdata = this.listdata.filter(f => f.idbend != e.data.idbend);
      this.listdata.splice(index, 0, e.data);
    }
  }
  getDatas(){
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit)
        .subscribe(resp => {
          this.listdata = [];
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
      this.notif.warning('Pilih SKPD');
    }
  }
  add(){
    if(this.unitSelected.hasOwnProperty('idunit')){
      this.Form.idunit = this.unitSelected.idunit;
      this.Form.title = 'Tambah';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  update(e: Ibend){
    this.Form.idunit = this.unitSelected.idunit;
    this.Form.forms.patchValue({
      idbend : e.idbend,
      idpemda : e.idpemda,
      jnsbend : e.jnsbend ? e.jnsbend.trim() : '',
      idpeg : e.idpeg,
      idbank : e.idbank,
      nmcabbank : e.nmcabbank,
      rekbend : e.rekbend,
      npwpbend : e.npwpbend,
      jabbend : e.jabbend,
      saldobankup : e.saldobankup,
      saldobankpajak : e.saldobankpajak,
      saldotunaiup : e.saldotunaiup,
      saldotunaipajak : e.saldotunaipajak,
      tglstopbend : e.tglstopbend,
      warganegara : e.warganegara,
      stpendududuk : e.stpendududuk,
      staktif : e.staktif,
      datecreate : e.datecreate
    });
    if(e.idpegNavigation){
      this.Form.uiPeg = {kode: e.idpegNavigation.nip != '' ? e.idpegNavigation.nip.trim() : '', nama: e.idpegNavigation.nama};
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataKlick(e: Ibend){
		this.dataSelected = e;
	}
  delete(e: Ibend){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idbend).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idbend !== e.idbend);
              this.notif.success('Data berhasil dihapus');
              this.dt.reset();
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
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
  }
}
