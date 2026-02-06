import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISpjspp } from 'src/app/core/interface/ispjspp';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpjsppService } from 'src/app/core/services/spjspp.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-spm-gu-detail-spj-verifikasi',
  templateUrl: './spm-gu-detail-spj-verifikasi.component.html',
  styleUrls: ['./spm-gu-detail-spj-verifikasi.component.scss']
})
export class SpmGuDetailSpjVerifikasiComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: ISpjspp[] = [];
  @Input() SpmSelected : ISpm;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : number;
  constructor(
    private sppdetrService: SppdetrService,
    private service: SpjsppService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.sppdetrService._tabIndex.subscribe(resp => {
      this.indexSubs = resp;
        if(this.indexSubs == 0){
          this.get();
        } else {
          this.listdata = [];
        }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SpmSelected;
    if(this.indexSubs == 0) this.get();
  }
  ngOnInit() {
  }
  get(){
    if(this.SpmSelected && this.indexSubs == 0){
      this.loading = true;
      this.listdata = [];
      this.service.getBySpp(this.SpmSelected.idspp, '42')
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data SPJ Tidak Tersedia');
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
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.SpmSelected = null;
    this.indexSubs = 0;
  }
}
