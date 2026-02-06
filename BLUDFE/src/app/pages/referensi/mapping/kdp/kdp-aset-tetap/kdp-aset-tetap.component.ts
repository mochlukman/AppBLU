import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {DaftrekeningService} from 'src/app/core/services/daftrekening.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-kdp-aset-tetap',
  templateUrl: './kdp-aset-tetap.component.html',
  styleUrls: ['./kdp-aset-tetap.component.scss']
})
export class KdpAsetTetapComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: IDaftrekening[] = [];
  dataselected: IDaftrekening | null;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  constructor(
    private service: DaftrekeningService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
    this.get();
  }
  get(){
    this.loading = true;
    this.listdata = [];
    this.service.getByStartKode('1.3.06.').subscribe(resp => {
      if(resp.length > 0){
        this.listdata = [...resp];
      } else {
        this.notif.info('Data Tidak Tersedia');
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error; i++){
          this.notif.error(error.error.error[i]);
        }
      } else {
        this.notif.error(error.error);
      }
    });
  }
  rincian(e: IDaftrekening){
    this.dataselected = e;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.loading = false;
  }
}
