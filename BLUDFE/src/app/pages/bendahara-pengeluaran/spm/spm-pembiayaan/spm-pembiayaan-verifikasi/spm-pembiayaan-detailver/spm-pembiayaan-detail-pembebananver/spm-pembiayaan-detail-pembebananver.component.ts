import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISpm } from 'src/app/core/interface/ispm';
import { ISppdetb } from 'src/app/core/interface/isppdetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetbService } from 'src/app/core/services/sppdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-spm-pembiayaan-detail-pembebananver',
  templateUrl: './spm-pembiayaan-detail-pembebananver.component.html',
  styleUrls: ['./spm-pembiayaan-detail-pembebananver.component.scss']
})
export class SpmPembiayaanDetailPembebananverComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetb[] = [];
  @Input() SpmSelected : ISpm;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private service: SppdetbService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SpmSelected;
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
    }
  }
  ngOnInit() {
  }
  get(){
    if(this.SpmSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.SpmSelected.idspp)
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
    this.SpmSelected = null;
  }
}
