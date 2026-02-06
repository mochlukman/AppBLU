import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDpab } from 'src/app/core/interface/idpab';
import { IDpablnb } from 'src/app/core/interface/idpablnb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpabService } from 'src/app/core/services/dpab.service';
import { DpablnbService } from 'src/app/core/services/dpablnb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { FormKasbComponent } from './form-kasb/form-kasb.component';

@Component({
  selector: 'app-skb-anggaran-kas',
  templateUrl: './skb-anggaran-kas.component.html',
  styleUrls: ['./skb-anggaran-kas.component.scss']
})
export class SkbAnggaranKasComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  @Input() rekSelected: IDpab;
  loading: boolean = false;
  listdata: IDpablnb[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: true}) dt: any;
  @ViewChild(FormKasbComponent, {static: true}) Form: FormKasbComponent;
  constructor(
    private service: DpablnbService,
    private service_rek: DpabService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 1){
      this.get();
    } else {
      this.listdata = [];
    }
  }

  ngOnInit() {
  }
  get(){
    if(this.rekSelected && this.tabIndex == 1){
      this.loading = true;
      this.listdata = [];
      if(this.dt) this.dt.reset();
      this.service.gets(this.rekSelected.iddpab)
        .subscribe(resp => {
          this.listdata = [];
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Penjabaran Tidak Tersedia');
          }
          this.loading = false;
        },(error) => {
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
  callback(e: any){
    if(e.edited){
      let index = this.listdata.findIndex(f => f.iddpablnb === e.data.iddpablnb);
      this.listdata = this.listdata.filter(f => f.iddpablnb != e.data.iddpablnb);
      this.listdata.splice(index, 0, e.data);
      this.totalNilai();
    }
  }
  put(e: IDpablnb){
    this.Form.title = 'Ubah Nilai';
    this.Form.forms.patchValue({
      iddpablnb: e.iddpablnb,
      iddpab: e.iddpab,
      idbulan: e.idbulan,
      ketbulan: e.ketbulan,
      nilai: e.nilai
    });
    this.Form.showThis = true;
  }
  totalNilai(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => total += f.nilai);
		}
		return total;
  }
  ngOnDestroy():void{
    this.listdata = [];
    this.rekSelected = null;
  }
}