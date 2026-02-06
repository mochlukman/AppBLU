import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ISppdetb } from 'src/app/core/interface/isppdetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetbService } from 'src/app/core/services/sppdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-sp2d-pembiayaan-verifikasi-detail-pembebanan',
  templateUrl: './sp2d-pembiayaan-verifikasi-detail-pembebanan.component.html',
  styleUrls: ['./sp2d-pembiayaan-verifikasi-detail-pembebanan.component.scss']
})
export class Sp2dPembiayaanVerifikasiDetailPembebananComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetb[] = [];
  @Input() Sp2dSelected : ISp2d;
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
    this.Sp2dSelected;
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
    }
  }
  ngOnInit() {
  }
  get(){
    if(this.Sp2dSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.Sp2dSelected.idspmNavigation.idspp)
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
    this.Sp2dSelected = null;
  }
}
