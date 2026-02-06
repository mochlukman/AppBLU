import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IBpkSpj } from 'src/app/core/interface/ibpk-spj';
import { ISpj } from 'src/app/core/interface/ispj';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkSpjService } from 'src/app/core/services/bpk-spj.service';
import { SpjDetailService } from 'src/app/core/services/spj-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { SpjPengesahanDetailBelanjaRincianComponent } from './spj-pengesahan-detail-belanja-rincian/spj-pengesahan-detail-belanja-rincian.component';

@Component({
  selector: 'app-spj-pengesahan-detail-belanja',
  templateUrl: './spj-pengesahan-detail-belanja.component.html',
  styleUrls: ['./spj-pengesahan-detail-belanja.component.scss']
})
export class SpjPengesahanDetailBelanjaComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  @Input() spjSelected: ISpj;
  loading: boolean;
  userInfo: ITokenClaim;
  index: number;
  listdata: IBpkSpj[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(SpjPengesahanDetailBelanjaRincianComponent, {static: true}) RincianBelanja : SpjPengesahanDetailBelanjaRincianComponent;
  constructor(
    private service : BpkSpjService,
    private notif: NotifService,
    private auth : AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
   }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
      this.ngOnDestroy();
    }
  }
  get(){
    if(this.spjSelected && this.tabIndex == 0){
      this.loading = true;
      this.listdata = [];
      this.service.gets('spj', this.spjSelected.idspj)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
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
  detailBpk(d: IBpkSpj){
    this.RincianBelanja.title = `Rincian Belanja BPK : ${d.idbpkNavigation.nobpk}`;
    this.RincianBelanja.BpkSelected = d.idbpkNavigation;
    this.RincianBelanja.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.spjSelected = null;
  }
}