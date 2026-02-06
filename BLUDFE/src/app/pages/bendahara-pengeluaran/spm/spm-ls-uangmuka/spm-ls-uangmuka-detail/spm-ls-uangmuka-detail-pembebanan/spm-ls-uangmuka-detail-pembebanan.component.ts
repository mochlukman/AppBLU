import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ISppdetr } from 'src/app/core/interface/isppdetr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-spm-ls-uangmuka-detail-pembebanan',
  templateUrl: './spm-ls-uangmuka-detail-pembebanan.component.html',
  styleUrls: ['./spm-ls-uangmuka-detail-pembebanan.component.scss']
})
export class SpmLsUangmukaDetailPembebananComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetr[] = [];
  @Input() SpmSelected : ISpm;
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
    this.SpmSelected;
    if(this.tabIndex == 0) {
      this.get();
    } else {
      this.listdata = [];
    }
  }
  ngOnInit() {
  }
  get(){
    if(this.SpmSelected && this.KegSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.SpmSelected.idspp, this.KegSelected.data_id)
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.SpmSelected = null;
    this.KegSelected = null;
    this.service.setDataSelected(null);
    this.subDataSelected.unsubscribe();
  }
}
