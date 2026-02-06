import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { IWebUser } from 'src/app/core/interface/iweb-user';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { WebUserService } from 'src/app/core/services/web-user.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormKelolaComponent } from '../form-kelola/form-kelola.component';

@Component({
  selector: 'app-kelola-bud',
  templateUrl: './kelola-bud.component.html',
  styleUrls: ['./kelola-bud.component.scss']
})
export class KelolaBudComponent implements OnInit, OnDestroy {
  subscribe_index : Subscription;
  loading: boolean;
  listdata: IWebUser[] = [];
  cols: any[] = [];
  dataSelected: IWebUser = null;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(FormKelolaComponent, {static: true}) Form : FormKelolaComponent;
  constructor(
    private service: WebUserService,
    private auth: AuthenticationService,
    private notif: NotifService
  ) {
    this.subscribe_index = this.service._tabIndex.subscribe(resp => {
      if(resp === 0){
        this.get();
      }
    });
    this.userInfo = this.auth.getTokenInfo();
    this.cols = [
      {field: 'userid'},
      {field: 'nama'},
      {field: 'group.nmgroup'},
      {field: 'otorisasi'},
      {field: 'disetujui'},
      {field: 'pilih'}
		];
  }

  ngOnInit() {
  }
  get(){
    if(this.dt) this.dt.reset();
      this.loading = true;
      this.service.getByGroupId('10,11')
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
  dataKlick(e: IWebUser){
		this.dataSelected = e;
	}
  openApproved(e: IWebUser){
    this.Form.title = `Form Persetujuan Pengguna BUD`;
    this.Form.forms.patchValue({
      userid: e.userid != '' ? e.userid.trim() : '',
      nama: e.nama != '' ? e.nama.trim() : '',
      otorisasi: e.otorisasi,
      kelompok: e.group.nmgroup,
      isauthorized: e.isauthorized
    });
    if(e.isauthorized != null){
      if(e.isauthorized == true){
        this.Form.setuju = true;
      } else if(e.isauthorized == false) {
        this.Form.tidak = true;
      }
    }
      
    this.Form.showThis = true;
  }
  callbackApproval(e: any){
    if(e.update){
      let index = this.listdata.findIndex(f => f.userid.trim() === e.data.userid.trim());
      this.listdata = this.listdata.filter(f => f.userid.trim() != e.data.userid.trim());
      this.listdata.splice(index, 0, e.data);
    }
  }
  ngOnDestroy(): void{
    this.subscribe_index.unsubscribe();
    this.listdata = [];
  }
}
