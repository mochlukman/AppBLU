import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISpj } from 'src/app/core/interface/ispj';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkSpjService } from 'src/app/core/services/bpk-spj.service';
import { JurnalKasService } from 'src/app/core/services/jurnal-kas.service';
import { SpjDetailService } from 'src/app/core/services/spj-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-jurnal-belanja-up-detail-rincian-jurnal',
  templateUrl: './jurnal-belanja-up-detail-rincian-jurnal.component.html',
  styleUrls: ['./jurnal-belanja-up-detail-rincian-jurnal.component.scss']
})
export class JurnalBelanjaUpDetailRincianJurnalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  @Input() spjSelected: ISpj;
  loading: boolean;
  userInfo: ITokenClaim;
  index: number;
  listdata: any[] = [];
  subTabIndex: number = 0;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private service : JurnalKasService,
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
  onChangeTab(e: any){
    this.subTabIndex = e.index;
    this.get();
  }
  get(){
    if(this.spjSelected && this.tabIndex == 0){
      this.loading = true;
      this.listdata = [];
      this.service.ayatAyat(this.spjSelected.idunit, 'SPJ', this.spjSelected.nospj, this.subTabIndex + 1)
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
  ngOnDestroy(): void {
    this.listdata = [];
    this.subTabIndex = 0;
  }
}