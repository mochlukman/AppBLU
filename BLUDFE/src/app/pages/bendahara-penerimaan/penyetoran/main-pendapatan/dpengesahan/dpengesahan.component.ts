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
import { DaftunitService } from 'src/app/core/services/daftunit.service';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { DpengesahanFormComponent } from './dpengesahan-form/dpengesahan-form.component';

@Component({
  selector: 'app-dpengesahan',
  templateUrl: './dpengesahan.component.html',
  styleUrls: ['./dpengesahan.component.scss']
})
export class DpengesahanComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  indexSubs : Subscription;
  listdata: ISts[] = [];
  dataSelected: ISts = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(DpengesahanFormComponent, {static: true}) Form: DpengesahanFormComponent;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private auth: AuthenticationService,
    private service: StsService,
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
    this.get()
  }
  get(){
    this.dataSelected = null;
    this.listdata = [];
    if(this.unitSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.gets(this.unitSelected.idunit, 0, '60,61,62,63,64,65', 1)
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
    if(e.added || e.edited){
      this.get();
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
      valid: e.valid,
      ketvalid: e.ketvalid
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
    this.Form.title = 'Pengesahan STS';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ISts){
    let postBody = {
      idsts : e.idsts,
      idunit : e.idunit,
      nosts : e.nosts,
      kdstatus : e.kdstatus,
      idbend : e.idbend,
      idxkode : e.idxkode,
      tglsts : e.tglsts ?  new Date(e.tglsts) : null,
      tglvalid: null,
      nobbantu: e.nobbantu,
      uraian : e.uraian,
      valid: null,
      ketvalid: ''
    }
    this.notif.confir({
			message: `Batalkan Pengesahan Untuk No STS : ${e.nosts} ?`,
			accept: () => {
				this.service.pengesahan(postBody).subscribe(
					(resp) => {
						if (resp.ok) {
              this.notif.success('Pengesahan berhasil dibatalkan');
              this.get();
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
