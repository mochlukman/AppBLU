import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {SpjapbddetService} from 'src/app/core/services/spjapbddet.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-pengesahan-spj-apbd-rincian',
  templateUrl: './pengesahan-spj-apbd-rincian.component.html',
  styleUrls: ['./pengesahan-spj-apbd-rincian.component.scss']
})
export class PengesahanSpjApbdRincianComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: any[] = [];
  dataSelected : any = null;
  userInfo: ITokenClaim;
  @Input() apbdSelected: any;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private service: SpjapbddetService,
    private notif: NotifService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.apbdSelected;
    this.get();
  }
  callback(e: any){
    if(e.added || e.edited){
      this.get();
    }
  }
  get(){
    if(this.apbdSelected){
      this.loading = true;
      this.listdata = [];
      const param = {
        Idspjapbd: this.apbdSelected.idspjapbd,
        Idnojetra: 41
      }
      this.service.gets(param)
        .subscribe(resp => {
          if(resp.length){
            this.listdata = [...resp]
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, error => {
          this.loading = false;
          if(Array.isArray(error.error.error)){
            for(let i = 0; i < error.error.error.length; i++){
              this.notif.error(error.error.error[i]);
            }
          } else {
            this.notif.error(error.error);
          }
        });
    } else {
      this.listdata = [];
    }
  }
  rekKlik(e: any){
    this.dataSelected = e;
  }
  ngOnDestroy() : void {
    this.dataSelected = null;
    this.listdata = [];
  }
}
