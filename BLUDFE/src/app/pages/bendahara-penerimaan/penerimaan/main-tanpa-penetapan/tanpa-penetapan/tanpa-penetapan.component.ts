import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ITbp } from 'src/app/core/interface/itbp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TbpService } from 'src/app/core/services/tbp.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { TanpaPenetapanFormComponent } from './tanpa-penetapan-form/tanpa-penetapan-form.component';

@Component({
  selector: 'app-tanpa-penetapan',
  templateUrl: './tanpa-penetapan.component.html',
  styleUrls: ['./tanpa-penetapan.component.scss']
})
export class TanpaPenetapanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  indexSubs : Subscription;
  listdata: ITbp[] = [];
  dataSelected: ITbp = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(TanpaPenetapanFormComponent, {static: true}) Form: TanpaPenetapanFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: TbpService,
    private notif: NotifService,
    private unitService: DaftunitService
          ) {
            this.userInfo = this.auth.getTokenInfo();
            this.uiUnit = {kode: '', nama: ''};
            this.indexSubs = this.service._tabIndex.subscribe(resp => {
              if(resp === 0){
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
    this.listdata = [];
    this.get();
  }
  get(){
    this.dataSelected = null;
    this.listdata = [];
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit, '60,63', 1, 0)
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
      let index = this.listdata.findIndex(f => f.idtbp === e.data.idtbp);
      this.listdata = this.listdata.filter(f => f.idtbp != e.data.idtbp);
      this.listdata.splice(index, 0, e.data);
    }
    this.dataSelected = null;
  }
  dataKlick(e: ITbp){
    if(this.unitSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit');
    }
	}
  add(){
    if(this.unitSelected){
      this.Form.title = 'Tambah TBP';
      this.Form.mode = 'add';
      this.Form.forms.patchValue({
        idunit : this.unitSelected.idunit
      });
      this.Form.unitSelected = this.unitSelected;
      this.Form.showThis = true;
    }
  }
  update(e: ITbp){
    this.Form.forms.patchValue({
      idtbp : e.idtbp,
      idunit : e.idunit,
      notbp : e.notbp,
      kdstatus : e.kdstatus,
      idbend1 : e.idbend1,
      idxkode : e.idxkode,
      tgltbp : e.tgltbp ? new Date(e.tgltbp) : null,
      penyetor: e.penyetor,
      alamat: e.alamat,
      uraitbp : e.uraitbp,
      tglvalid : e.tglvalid ? new Date(e.tglvalid) : null,
    });
    this.Form.unitSelected = this.unitSelected;
    if(e.idbend1Navigation){
      this.Form.bendSelected = e.idbend1Navigation;
      this.Form.uiBend = {
        kode: e.idbend1Navigation.idpegNavigation.nip,
        nama: e.idbend1Navigation.idpegNavigation.nama + ',' + e.idbend1Navigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbend1Navigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Ubah TBP';
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
  print(data: ITbp){}
  ngOnDestroy():void {
    this.listdata = [];
		this.uiUnit = { kode: '', nama: '' };
		this.unitSelected = null;
		this.dataSelected = null;
    this.indexSubs.unsubscribe();
  }
}
