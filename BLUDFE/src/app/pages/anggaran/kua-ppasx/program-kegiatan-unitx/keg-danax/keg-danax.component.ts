import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IKegsbdana } from 'src/app/core/interface/ikegsbdana';
import { Ikegunit } from 'src/app/core/interface/ikegunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { KegsbdanaService } from 'src/app/core/services/kegsbdana.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { KegDanaFormxComponent } from './keg-dana-formx/keg-dana-formx.component';

@Component({
  selector: 'app-keg-danax',
  templateUrl: './keg-danax.component.html',
  styleUrls: ['./keg-danax.component.scss']
})
export class KegDanaxComponent implements OnInit {
  showThis: boolean;
  title: string = '';
  loading: boolean = false;
  kegSelected: Ikegunit = null;
  listdata: IKegsbdana[] = [];
  msg: Message[];
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:true}) dt: any;
  @ViewChild(KegDanaFormxComponent, {static: true}) Form : KegDanaFormxComponent;
  isvalid: boolean = false;
  constructor(
    private service: KegsbdanaService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnInit() {
  }
  get(){
    if(this.kegSelected){
      this.listdata = [];
      if(this.loading) this.loading = true;
      this.service.gets(this.kegSelected.idkegunit).subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        }
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.msg = []
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }      
      });
    }
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      this.msg = [];
      this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Ditambahkan'});
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idkegdana === e.data.idkegdana);
      this.listdata = this.listdata.filter(f => f.idkegdana != e.data.idkegdana);
      this.listdata.splice(index, 0, e.data);
      this.msg = [];
      this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Diubah'});
    }
    if(this.dt) this.dt.reset();
  }
  add(){
    this.Form.title = 'Tambah Sumber Dana';
    this.Form.mode = 'add';
    this.Form.forms.patchValue({
      idkegunit : this.kegSelected.idkegunit
    });
    this.Form.showThis = true;
  }
  update(e: IKegsbdana){
    this.Form.title = 'Ubah Sumber Dana';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idkegdana : e.idkegdana,
      idkegunit : e.idkegunit,
      idjdana : e.idjdana,
      nilai :e.nilai,
      nilaix : e.kegsbdana ? e.kegsbdana.nilai : 0
    });
    if(e.idjdanaNavigation){
      this.Form.uiJdana = {kode : e.idjdanaNavigation.kddana.trim(), nama: e.idjdanaNavigation.nmdana.trim()};
      this.Form.jdanaSelected = e.idjdanaNavigation;
    }
    this.Form.showThis = true;
  }
  delete(e: IKegsbdana){
    this.notif.confir({
			message: `${e.idjdanaNavigation ? e.idkegunitNavigation.nmkegunit : ''} Akan Dihapus`,
			accept: () => {
				this.service.delete(e.idkegdana).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idkegdana !== e.idkegdana);
              this.msg = [];
              this.msg.push({severity: 'success', summary: 'success', detail: 'Data Berhasil Dihapus'});
              this.dt.reset();
						}
					}, (error) => {
            if(Array.isArray(error.error.error)){
              this.msg = [];
              for(var i = 0; i < error.error.error.length; i++){
                this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
              }
            } else {
              this.msg = [];
              this.msg.push({severity: 'error', summary: 'error', detail: error.error});
            }    
          });
			},
			reject: () => {
				return false;
			}
		});
  }
  onShow(){
    this.get();
  }
  onHide(){
    this.kegSelected = null;
    this.listdata = [];
    this.loading = false;
    this.msg = [];
    this.showThis = false;
  }
}
