import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IBkutbpspjtr } from 'src/app/core/interface/ibkutbpspjtr';
import { ISpjtr } from 'src/app/core/interface/ispjtr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkutbpspjtrService } from 'src/app/core/services/bkutbpspjtr.service';
import { SpjtrDetailService } from 'src/app/core/services/spjtr-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-spj-bku-penerimaan-sah',
  templateUrl: './spj-bku-penerimaan-sah.component.html',
  styleUrls: ['./spj-bku-penerimaan-sah.component.scss']
})
export class SpjBkuPenerimaanSahComponent implements OnInit, OnChanges, OnDestroy  {
  loading: boolean;
  @Input() spjtrSelected: ISpjtr;
  userInfo: ITokenClaim;
  indexSubs : Subscription;
  index: number;
  listdata: IBkutbpspjtr[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private spjtrdetail : SpjtrDetailService,
    private service : BkutbpspjtrService,
    private notif: NotifService,
    private auth : AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.indexSubs = this.spjtrdetail._tabIndex.subscribe(resp => {
      this.index = resp;
      if(this.index == 0){
        this.get();
      } else {
        this.listdata = [];
      }
    });
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.spjtrSelected.currentValue){
      this.get();
    }
  }
  get(){
    if(this.spjtrSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.spjtrSelected.idspjtr)
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
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    }
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.spjtrSelected = null;
    this.indexSubs.unsubscribe();
  }
}
