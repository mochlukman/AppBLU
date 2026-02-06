import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ibend } from 'src/app/core/interface/ibend';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISkp } from 'src/app/core/interface/iskp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SkpService } from 'src/app/core/services/skp.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { SkrFormComponent } from './skr-form/skr-form.component';

@Component({
  selector: 'app-skr',
  templateUrl: './skr.component.html',
  styleUrls: ['./skr.component.scss']
})
export class SkrComponent implements OnInit {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  indexSubs : Subscription;
  listdata: ISkp[] = [];
  dataSelected: ISkp = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(SkrFormComponent, {static: true}) Form: SkrFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: SkpService,
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
      this.service.gets(this.unitSelected.idunit, 0, '73,77', 1)
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
      let index = this.listdata.findIndex(f => f.idskp === e.data.idskp);
      this.listdata = this.listdata.filter(f => f.idskp != e.data.idskp);
      this.listdata.splice(index, 0, e.data);
    }
    this.dataSelected = null;
  }
  dataKlick(e: ISkp){
    if(this.unitSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit');
    }
	}
  add(){
    if(this.unitSelected){
      this.Form.title = 'Tambah SKR';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.unitSelected.idunit
      });
      this.Form.unitSelected = this.unitSelected;
      this.Form.showThis = true;
    }
  }
  update(e: ISkp){
    this.Form.forms.patchValue({
      idskp : e.idskp,
      idunit : e.idunit,
      noskp : e.noskp,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      npwpd: e.npwpd,
      idxkode : e.idxkode,
      tglskp : e.tglskp ? new Date(e.tglskp) : null,
      penyetor: e.penyetor,
      alamat: e.alamat,
      uraiskp : e.uraiskp,
      tgltempo : e.tgltempo ? new Date(e.tgltempo) : null,
      bunga: e.bunga,
      kenaikan:e.kenaikan,
      tglvalid : e.tglvalid ? new Date(e.tglvalid) : null,
    });
    this.Form.unitSelected = this.unitSelected;
    if(e.idbendNavigation){
      this.Form.bendSelected = e.idbendNavigation;
      this.Form.uiBend = {
        kode: e.idbendNavigation.idpegNavigation.nip, 
        nama: e.idbendNavigation.idpegNavigation.nama + ',' + e.idbendNavigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbendNavigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Ubah SKR';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISkp){
    this.notif.confir({
			message: `${e.noskp} Akan Dihapus ?`,
			accept: () => {
				this.service.delete(e.idskp).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idskp !== e.idskp);
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
  print(data: ISkp){}
  ngOnDestroy():void {
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    this.indexSubs.unsubscribe();
  }
}
