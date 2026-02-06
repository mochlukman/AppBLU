import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPanjar } from 'src/app/core/interface/ipanjar';
import { IPanjardet } from 'src/app/core/interface/ipanjardet';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PanjardetService } from 'src/app/core/services/panjardet.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { PanjarRincianFormComponent } from '../panjar-rincian-form/panjar-rincian-form.component';
import {LookDpakegiatanComponent} from 'src/app/shared/lookups/look-dpakegiatan/look-dpakegiatan.component';

@Component({
  selector: 'app-panjar-rincian-kegiatan',
  templateUrl: './panjar-rincian-kegiatan.component.html',
  styleUrls: ['./panjar-rincian-kegiatan.component.scss']
})
export class PanjarRincianKegiatanComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading_post: boolean;
  loading: boolean;
  userInfo: ITokenClaim;
  listdata: IPanjardet[];
  dataSelected: IPanjardet;
  @Input() panjarSelected: IPanjar;
  @ViewChild(LookDpakegiatanComponent,{static: true}) LookKegiatan : LookDpakegiatanComponent;
  @ViewChild(PanjarRincianFormComponent,{static: true}) Form : PanjarRincianFormComponent;
  @ViewChild('dt', {static:true}) dt: any;
  panjarSub: Subscription;
  constructor(
    private service: PanjardetService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.panjarSelected
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
    }
  }
  callBack(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idpanjardet === e.data.idpanjardet);
      this.listdata = this.listdata.filter(f => f.idpanjardet != e.data.idpanjardet);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    this.loading = true;
    this.listdata = [];
    this.service.gets(this.panjarSelected.idpanjar)
      .subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        } else {
          this.notif.info('Data Kegiatan Tidak Tersedia');
        }
        this.loading = false;
      }, (error) => {
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
  add(){
    this.LookKegiatan.title = 'Tambah Kegiatan';
    this.LookKegiatan.get(this.panjarSelected.idunit, '321');
    this.LookKegiatan.showThis = true;
  }
  callBackKegiatan(e: any){
    let paramBody: any = {
      idkeg : e.data_id,
      idpanjar : this.panjarSelected.idpanjar,
      idnojetra: this.panjarSelected.kdstatus.trim() == '31' ? '32' : '31'
    };
    this.loading_post = true;
    this.service.post(paramBody).subscribe(resp => {
      if (resp.ok) {
        this.callBack({
          added: true,
          data: resp.body
        });
        this.notif.success('Input Data Berhasil');
      }
      this.loading_post = false;
    },(error) => {
        this.loading_post = false;
        if(Array.isArray(error.error.error)){
          for(var i = 0; i < error.error.error.length; i++){
            this.notif.error(error.error.error[i]);
          }
        } else {
          this.notif.error(error.error);
        }
      });
  }
  update(e: IPanjardet){
    this.Form.title = 'Ubah Nilai Kegiatan';
    this.Form.mode = 'edit';
    this.Form.forms.patchValue({
      idpanjar: e.idpanjar,
      idpanjardet : e.idpanjardet,
      idkeg: e.idkeg,
      idnojetra: e.idnojetra,
      nilai : e.nilai
    });
    this.Form.showThis = true;
  }
  delete(e: IPanjardet){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idpanjardet).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idpanjardet !== e.idpanjardet);
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
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy():void{
    this.dataSelected = null;
    this.panjarSelected = null;
    this.listdata = [];
  }
}
