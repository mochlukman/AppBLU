import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {Sp3bdetService} from 'src/app/core/services/sp3bdet.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-sp3b-sah-rincian',
  templateUrl: './sp3b-sah-rincian.component.html',
  styleUrls: ['./sp3b-sah-rincian.component.scss']
})
export class Sp3bSahRincianComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dataselected : any;
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  constructor(
    private auth: AuthenticationService,
    private service: Sp3bdetService,
    private notif: NotifService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.dataselected;
    this.gets();
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    const params = {
      Idsp3b: this.dataselected.idsp3b
    };
    this.service.gets(params).subscribe(resp => {
      if(resp.length > 0){
        this.listdata = resp;
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
  ngOnDestroy(): void {
    this.listdata = [];
  }
}
