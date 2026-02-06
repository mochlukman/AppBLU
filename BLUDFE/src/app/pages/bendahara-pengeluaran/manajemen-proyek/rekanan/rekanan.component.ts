import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IDaftphk3 } from 'src/app/core/interface/idaftphk3';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Daftphk3Service } from 'src/app/core/services/daftphk3.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { FormRekenanComponent } from './form-rekenan/form-rekenan.component';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-rekanan',
  templateUrl: './rekanan.component.html',
  styleUrls: ['./rekanan.component.scss']
})
export class RekananComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IDaftphk3[] = [];
  dataSelected: IDaftphk3 = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(FormRekenanComponent, {static: true}) Form: FormRekenanComponent;
  title: string = '';
  constructor(
    private auth: AuthenticationService,
    private service: Daftphk3Service,
    private notif: NotifService,
    private global: GlobalService,
    private unitService: DaftunitService
  ) {
    this.global._title.subscribe((s) => this.title = s);
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
  ngOnInit() {
  }
  lookDaftunit(){
    this.Daftunit.title = 'Pilih SKPD';
    this.Daftunit.gets('3,4');
    this.Daftunit.showThis = true;
  }
  callBackDaftunit(e: IDaftunit){
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
      let index = this.listdata.findIndex(f => f.idphk3 === e.data.idphk3);
      this.listdata = this.listdata.filter(f => f.idphk3 != e.data.idphk3);
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
      this.Form.forms.patchValue({
        idunit: this.unitSelected.idunit
      });
      this.Form.title = 'Tambah';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  update(e: IDaftphk3){
    this.Form.forms.patchValue({
      idphk3: e.idphk3,
      idunit: e.idunit,
      nmphk3: e.nmphk3,
      nminst: e.nminst,
      idbank: e.idbank,
      cabangbank: e.cabangbank,
      alamatbank: e.alamatbank,
      norekbank: (e.norekbank != '' || e.norekbank != null) ? e.norekbank.trim() : '',
      idjusaha: e.idjusaha,
      alamat: e.alamat,
      telepon: e.telepon,
      npwp: (e.npwp != '' || e.npwp != null) ? e.npwp.trim() : '',
      warganegara: e.warganegara,
      stpenduduk: e.stpenduduk,
      namapemilik: e.namapemilik
    });
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: IDaftphk3){
    this.notif.confir({
			message: `${e.nmphk3} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idphk3).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idphk3 !== e.idphk3);
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
  dataKlick(e: IDaftphk3){
		this.dataSelected = e;
	}
  ngOnDestroy(): void {
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
  }
}
