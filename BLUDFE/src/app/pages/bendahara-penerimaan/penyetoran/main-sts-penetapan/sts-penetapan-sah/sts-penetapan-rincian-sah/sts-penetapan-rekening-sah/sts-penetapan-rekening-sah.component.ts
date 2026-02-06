import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {IStsdetd} from 'src/app/core/interface/istsdetd';
import {ISts} from 'src/app/core/interface/ists';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {Subscription} from 'rxjs';
import {StsdetdService} from 'src/app/core/services/stsdetd.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-sts-penetapan-rekening-sah',
  templateUrl: './sts-penetapan-rekening-sah.component.html',
  styleUrls: ['./sts-penetapan-rekening-sah.component.scss']
})
export class StsPenetapanRekeningSahComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: IStsdetd[] = [];
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  constructor(
    private service: StsdetdService,
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
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.StsSelected){
      if(changes.StsSelected.previousValue){
        if(changes.StsSelected.currentValue.idsts != changes.StsSelected.previousValue.idsts){
          this.get();
        }
      } else {
        this.get();
      }
    }
  }
  ngOnInit() {
  }
  get(){
    if(this.StsSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.StsSelected.idsts)
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
  subTotal(){
    let total = 0;
    if(this.listdata.length > 0){
      this.listdata.forEach(f => total += +f.nilai);
    }
    return total;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.StsSelected = null;
    this.indexSubs.unsubscribe();
  }
}

