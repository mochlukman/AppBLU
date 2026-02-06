import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILookupTree } from 'src/app/core/interface/iglobal';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ISppdetr } from 'src/app/core/interface/isppdetr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-sp2d-ls-nonpegewai-detail-pembebanan',
  templateUrl: './sp2d-ls-nonpegewai-detail-pembebanan.component.html',
  styleUrls: ['./sp2d-ls-nonpegewai-detail-pembebanan.component.scss']
})
export class Sp2dLsNonpegewaiDetailPembebananComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetr[] = [];
  @Input() Sp2dSelected : ISp2d;
  @Input() KegSelected : ILookupTree;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: ISppdetr;
  subDataSelected: Subscription;
  constructor(
    private service: SppdetrService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.subDataSelected = this.service._dataSelected.subscribe(resp => {
      this.dataSelected = resp;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.KegSelected;
    this.Sp2dSelected;
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
    }
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
    if(this.Sp2dSelected && this.KegSelected){
      this.service.setDataSelected(null);
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.Sp2dSelected.idspmNavigation.idspp, this.KegSelected.data_id)
        .subscribe(resp => {
          this.listdata = [...resp];
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
  dataKlick(e: ISppdetr){
    this.service.setDataSelected(e);
	}
  subTotal1(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.totspd);
    }
    return total;
  }
  subTotal2(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.totspp);
    }
    return total;
  }
  subTotal3(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  subTotal4(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.sisa);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.Sp2dSelected = null;
    this.KegSelected = null;
    this.service.setDataSelected(null);
    this.subDataSelected.unsubscribe();
  }
}
