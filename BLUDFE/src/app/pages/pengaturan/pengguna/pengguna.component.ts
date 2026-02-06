import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { IWebUser } from 'src/app/core/interface/iweb-user';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { WebUserService } from 'src/app/core/services/web-user.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormPenggunaComponent } from './form-pengguna/form-pengguna.component';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.scss']
})
export class PenggunaComponent implements OnInit, OnDestroy {
  userInfo: ITokenClaim;
  loading: boolean;
  listdata: IWebUser[] = [];
  cols: any[] = [];
  dataSelected: IWebUser = null;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(FormPenggunaComponent, {static: true}) Form: FormPenggunaComponent;
  title: string = '';
  constructor(
    private auth: AuthenticationService,
    private service: WebUserService,
    private notif: NotifService,
    private globalService: GlobalService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.cols = [
      {field: 'userid'},
      {field: 'nama'},
      {field: 'group.nmgroup'},
      {field: 'otorisasi'},
      {field: 'stinsert'},
      {field: 'stupdate'},
      {field: 'stdelete'},
      {field: 'pilih'}
		];
    this.globalService._title.subscribe((resp) => {
      this.title = resp;
    });
  }
  ngOnInit() {
    this.getDatas();
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.userid.trim() === e.data.userid.trim());
      this.listdata = this.listdata.filter(f => f.userid.trim() != e.data.userid.trim());
      this.listdata.splice(index, 0, e.data);
    }
  }
  getDatas(){
    if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.getAll()
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
  }
  add(){
    this.Form.title = 'Tambah';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      kdtahap: '321'
    });
    this.Form.showThis = true;
  }
  update(e: IWebUser){
    this.Form.forms.patchValue({
      userid : e.userid,
      idunit : e.idunit,
      kdtahap : e.kdtahap,
      idpeg : e.idpeg,
      groupid : e.groupid,
      nama : e.nama,
      email : e.email,
      blokid : e.blokid,
      transecure : e.transecure,
      stmaker : e.stmaker,
      stchecker : e.stchecker,
      staproval : e.staproval,
      stlegitimator : e.stlegitimator,
      stinsert : e.stinsert,
      stupdate : e.stupdate,
      stdelete : e.stdelete,
      ket : e.ket
    });
    if(e.idunitNavigation){
      this.Form.uiUnit = {kode: e.idunitNavigation.kdunit, nama: e.idunitNavigation.nmunit};
    }
    if(e.idpegNavigation){
      this.Form.uiPeg = {kode: e.idpegNavigation.nip.trim(), nama: e.idpegNavigation.nama};
    }
    this.Form.title = 'Ubah';
    this.Form.mode = 'edit';
    this.Form.ngOnInit();
    this.Form.showThis = true;
  }
  dataKlick(e: IWebUser){
		this.dataSelected = e;
	}
  delete(e: IWebUser){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.userid.trim()).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.userid.trim() !== e.userid.trim());
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
  checkBtnUpdate(e: IWebUser){
		if(e.groupid != 1){
			return true;
		}
	}
  resetPassword(e: IWebUser){
		this.notif.confir({
			message: `Yakin Akan Reset Password ${e.userid} / ${e.nama} ? `,
			accept: () => {
				this.service.resetPassword(e.userid).subscribe(
					(resp) => {
						if (resp.ok) {
							let resp_data: any = resp.body;
              let index = this.listdata.findIndex(f => f.userid.trim() === resp_data.userid.trim());
              this.listdata = this.listdata.filter(f => f.userid.trim() != resp_data.userid.trim());
              this.listdata.splice(index, 0, resp_data);
							this.notif.success('Password berhasil Direset');
						}
					},(error) => {
						if(Array.isArray(error.error.error)){
							for(let i = 0; i < error.error.error.length; i++){
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
		this.dataSelected = null;
  }
}
