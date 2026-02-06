import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { PenetapanSahFormComponent } from './penetapan-sah-form/penetapan-sah-form.component';

@Component({
  selector: 'app-penetapan-sah',
  templateUrl: './penetapan-sah.component.html',
  styleUrls: ['./penetapan-sah.component.scss']
})
export class PenetapanSahComponent implements OnInit, OnDestroy {
  uiUnit: IDisplayGlobal;
  unitSelected: IDaftunit;
  userInfo: ITokenClaim;
  loading: boolean;
  indexSubs : Subscription;
  listdata: ITbp[] = [];
  dataSelected: ITbp = null;
  @ViewChild(LookDaftunitComponent, {static: true}) Daftunit : LookDaftunitComponent;
  @ViewChild(PenetapanSahFormComponent, {static: true}) Form: PenetapanSahFormComponent;
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
      this.service.gets(this.unitSelected.idunit, '61,64', 1, 0)
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
  }
  dataKlick(e: ITbp){
    if(this.unitSelected){
      this.dataSelected = e;
    } else {
      this.notif.warning('Pilih Unit');
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
      valid: e.valid,
      ketvalid: e.ketvalid,
      idskp: 0
    });
    this.Form.unitSelected = this.unitSelected;
    if(e.idbend1Navigation){
      this.Form.bendSelected = e.idbend1Navigation;
      this.Form.uiBend = {
        kode: e.idbend1Navigation.idpegNavigation.nip, 
        nama: e.idbend1Navigation.idpegNavigation.nama + ',' + e.idbend1Navigation.jnsbendNavigation.jnsbend.trim() + ' - ' + e.idbend1Navigation.jnsbendNavigation.uraibend.trim()
      };
    }
    this.Form.title = 'Pengesahan TBP';
    this.Form.mode = 'edit';
    this.Form.showThis = true;
  }
  delete(e: ITbp){
    let postBody = {
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
      tglvalid : null,
      valid: null,
      ketvalid: '',
      idskp: 0
    }
    this.notif.confir({
			message: `Batalkan Pengesahan Untuk No TBP : ${e.notbp}?`,
			accept: () => {
				this.service.pengesahan(postBody).subscribe(
					(resp) => {
						if (resp.ok) {
              this.get();
              this.notif.success('Pengesahan berhasil dibatalkan');
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
