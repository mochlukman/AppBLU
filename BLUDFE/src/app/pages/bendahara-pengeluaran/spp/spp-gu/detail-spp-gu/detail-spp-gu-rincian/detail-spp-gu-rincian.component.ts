import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpp } from 'src/app/core/interface/ispp';
import { ISppdetrTreeRoot } from 'src/app/core/interface/isppdetr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-detail-spp-gu-rincian',
  templateUrl: './detail-spp-gu-rincian.component.html',
  styleUrls: ['./detail-spp-gu-rincian.component.scss']
})
export class DetailSppGuRincianComponent implements OnInit, OnDestroy, OnChanges {
  loading: boolean;
  listdata: ISppdetrTreeRoot[] = [];
  @Input() SppSelected : ISpp;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : number;
  constructor(
    private service: SppdetrService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.service._tabIndex.subscribe(resp => {
        this.indexSubs = resp;
        if(this.indexSubs == 1){
          this.get();
        } else {
          this.listdata = [];
        }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SppSelected;
    if(this.indexSubs == 1) this.get();
  }
  ngOnInit() {
  }
  get(){
    if(this.SppSelected && this.indexSubs == 1){
      this.loading = true;
      this.listdata = [];
      this.service.getsTreeTable(this.SppSelected.idspp)
        .subscribe(resp => {
          if(resp.length > 0){
            let temp: ISppdetrTreeRoot[] = Object.assign(resp);
            temp.forEach(a => {
              let temp_total_nilai = 0;
              if(a.children.length > 0){
                a.children.forEach(b => {
                  temp_total_nilai += b.data.nilai;
                });
                a.data.nilai += temp_total_nilai;
              }
            });
            this.listdata = [...temp];
          } else {
            this.notif.info('Data Rekening Tidak Tersedia');
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
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.data.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.SppSelected = null;
    this.indexSubs = 0;
  }
}
