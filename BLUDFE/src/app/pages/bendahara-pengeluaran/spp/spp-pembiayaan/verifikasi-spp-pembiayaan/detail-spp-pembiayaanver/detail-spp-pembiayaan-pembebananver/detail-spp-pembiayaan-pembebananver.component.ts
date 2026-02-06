import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISpp } from 'src/app/core/interface/ispp';
import { ISppdetb } from 'src/app/core/interface/isppdetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetbService } from 'src/app/core/services/sppdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-detail-spp-pembiayaan-pembebananver',
  templateUrl: './detail-spp-pembiayaan-pembebananver.component.html',
  styleUrls: ['./detail-spp-pembiayaan-pembebananver.component.scss']
})
export class DetailSppPembiayaanPembebananverComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetb[] = [];
  cols: any[] = [];
  @Input() SppSelected : ISpp;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;;
  index: number;
  constructor(
    private service: SppdetbService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.cols = [
      {field: 'idrekNavigation.kdper'},
      {field: 'idrekNavigation.nmper'},
      {field: 'totspd'},
      {field: 'nilai'},
      {field: 'sisa'},
      {field: 'pilih'}
    ];
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SppSelected;
    if(this.tabIndex == 0) {
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
      let index = this.listdata.findIndex(f => f.idsppdetb === e.data.idsppdetb);
      this.listdata = this.listdata.filter(f => f.idsppdetb != e.data.idsppdetb);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.SppSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.SppSelected.idspp)
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.SppSelected = null;
  }
}