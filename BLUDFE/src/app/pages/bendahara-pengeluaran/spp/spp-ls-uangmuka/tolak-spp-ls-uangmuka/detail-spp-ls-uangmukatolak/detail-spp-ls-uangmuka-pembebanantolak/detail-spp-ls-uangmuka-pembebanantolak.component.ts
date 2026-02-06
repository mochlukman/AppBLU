import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpp } from 'src/app/core/interface/ispp';
import { ISppdetr } from 'src/app/core/interface/isppdetr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-detail-spp-ls-uangmuka-pembebanantolak',
  templateUrl: './detail-spp-ls-uangmuka-pembebanantolak.component.html',
  styleUrls: ['./detail-spp-ls-uangmuka-pembebanantolak.component.scss']
})
export class DetailSppLsUangmukaPembebanantolakComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: ISppdetr[] = [];
  @Input() SppSelected : ISpp;
  @Input() KegSelected : ILookupTree;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  dataSelected: ISppdetr;
  subDataSelected: Subscription;
  constructor(
    private service: SppdetrService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.indexSubs = this.service._tabIndex.subscribe(resp => {
      this.index = resp;
      if(this.index == 0){
        this.get();
      } else {
        this.listdata = [];
      }
    });
    this.subDataSelected = this.service._dataSelected.subscribe(resp => {
      this.dataSelected = resp;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.KegSelected;
    this.SppSelected;
    if(this.index == 0) this.get();
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idsppdetr === e.data.idsppdetr);
      this.listdata = this.listdata.filter(f => f.idsppdetr != e.data.idsppdetr);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.SppSelected && this.KegSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.SppSelected.idspp, this.KegSelected.data_id)
        .subscribe(resp => {
          this.listdata = [...resp];
          this.loading = false;
          this.service.setDataSelected(null);
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
  dataKlick(e: ISppdetr){
    this.service.setDataSelected(e);
	}
  ngOnDestroy(): void {
    this.listdata = [];
    this.SppSelected = null;
    this.KegSelected = null;
    this.indexSubs.unsubscribe();
    this.service.setDataSelected(null);
    this.subDataSelected.unsubscribe();
  }
}
