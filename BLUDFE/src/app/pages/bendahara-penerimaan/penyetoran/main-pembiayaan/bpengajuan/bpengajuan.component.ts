import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISts } from 'src/app/core/interface/ists';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsService } from 'src/app/core/services/sts.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { BPengajuanFormComponent } from './bpengajuan-form/bpengajuan-form.component';

@Component({
  selector: 'app-bpengajuan',
  templateUrl: './bpengajuan.component.html',
  styleUrls: ['./bpengajuan.component.scss']
})
export class BPengajuanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  indexSubs : Subscription;
  listdata: ISts[] = [];
  dataSelected: ISts = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(BPengajuanFormComponent, {static: true}) Form: BPengajuanFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: StsService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.uiUnit = {kode: '', nama: ''};
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      if(resp === 0){
      }
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
    this.dataSelected = null;
    this.listdata = [];
    this.get();
  }
  get(){
    this.dataSelected = null;
    this.listdata = [];
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit, 0, '16', 5, )
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
      this.notif.warning('Pilih Unit Organisasi');
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
    this.dataSelected = null;
  }
  dataKlick(e: ISts){
    if(this.unitSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit');
    }
	}
  add(){
    if(this.unitSelected){
      this.Form.title = 'Tambah STS';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.unitSelected.idunit
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
    });
    this.Form.unitSelected = this.unitSelected;
    if(e.nobbantuNavigation){
      this.Form.budSelected = e.nobbantuNavigation;
      this.Form.uiBud = {kode: e.nobbantuNavigation.nobbantu, nama: e.nobbantuNavigation.nmbkas};
    }
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip, 
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Ubah STS';
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
  print(data: ISts){}
  ngOnDestroy():void {
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    this.indexSubs.unsubscribe();
  }
}
