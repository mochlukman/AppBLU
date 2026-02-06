import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IAdendum } from 'src/app/core/interface/iadendum';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal, ILookupTree } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AdendumService } from 'src/app/core/services/adendum.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookDpakegiatanComponent } from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';
import { FormAdendumComponent } from './form-adendum/form-adendum.component';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-adendum',
  templateUrl: './adendum.component.html',
  styleUrls: ['./adendum.component.scss']
})
export class AdendumComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  uiKeg: IDisplayGlobal;
  kegSelected: ILookupTree;
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IAdendum[] = [];
  dataSelected: IAdendum = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(FormAdendumComponent, {static: true}) Form: FormAdendumComponent;
  @ViewChild(LookDpakegiatanComponent, {static: true}) Kegiatan : LookDpakegiatanComponent;
  title: string = '';
  constructor(
    private auth: AuthenticationService,
    private service: AdendumService,
    private notif: NotifService,
    private global: GlobalService,
    private unitService: DaftunitService
  ) {
    this.global._title.subscribe((s) => this.title = s);
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.uiKeg = { kode: '', nama: '' };
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
    this.listdata = [];
    this.uiKeg = {kode: '', nama: ''};
    this.kegSelected = null;
  }
  lookKegiatan(){
    if(this.unitSelected.hasOwnProperty('idunit')){
      this.Kegiatan.title = 'Pilih Kegiatan';
      this.Kegiatan.get(this.unitSelected.idunit, '321');
      this.Kegiatan.showThis = true;
    }
  }
  callBackKegiatan(e: ILookupTree){
    this.kegSelected = e;
    let split_label = this.kegSelected.label.split('-');
    this.uiKeg = {kode: split_label[0], nama: split_label[1]};
    this.getDatas();
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idadd === e.data.idadd);
      this.listdata = this.listdata.filter(f => f.idadd != e.data.idadd);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  getDatas(){
    if(this.kegSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit, this.kegSelected.data_id)
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
      this.notif.warning('Pilih Kegiatan');
    }
  }
  add(){
    if(this.kegSelected){
      this.Form.forms.patchValue({
        idunit: this.unitSelected.idunit,
        idkeg: this.kegSelected.data_id
      });
      this.Form.title = 'Tambah';
      this.Form.mode = 'add';
      this.Form.showThis = true;
    }
  }
  update(e: IAdendum){
    this.Form.forms.patchValue({
      idadd : e.idadd,
      idunit : e.idunit,
      idkeg : e.idkeg,
      noadd : e.noadd,
      tgladd :  e.tgladd != null ? new Date(e.tgladd) : new Date(),
      idkontrak : e.idkontrak,
      nilaiawal : e.nilaiawal,
      nilaiadd : e.nilaiadd,
    });
    if(e.idkontrakNavigation){
      this.Form.uiKontrak = {kode: e.idkontrakNavigation.nokontrak, nama: e.idkontrakNavigation.tglkontrak !== null ? new Date(e.idkontrakNavigation.tglkontrak).toLocaleDateString('en-US') : ''};
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  dataKlick(e: IAdendum){
    this.dataSelected = e;
	}
  delete(e: IAdendum){
    this.notif.confir({
			message: `${e.noadd} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idadd).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idadd !== e.idadd);
              this.listdata.sort((a,b) =>  (a.idadd > b.idadd ? 1 : -1));
              this.notif.success('Data berhasil dihapus');
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
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.uiKeg = { kode: '', nama: '' };
		this.unitSelected = null;
    this.kegSelected = null;
    this.dataSelected = null;
  }
}
