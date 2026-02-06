import {Component, Input, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ITbpdett} from 'src/app/core/interface/itbpdett';
import {ITbp} from 'src/app/core/interface/itbp';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {Subscription} from 'rxjs';
import {TbpdettService} from 'src/app/core/services/tbpdett.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pelbank-bp-to-bp-detail-penerima-sah',
  templateUrl: './pelbank-bp-to-bp-detail-penerima-sah.component.html',
  styleUrls: ['./pelbank-bp-to-bp-detail-penerima-sah.component.scss']
})
export class PelbankBpToBpDetailPenerimaSahComponent implements OnInit, OnDestroy {
  loading: boolean;
  listdata: ITbpdett[] = [];
  @Input() TbpSelected : ITbp;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  dataSelected: ITbpdett;
  constructor(
    private service: TbpdettService,
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
    this.TbpSelected;
    if(this.index == 0) this.get();
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex(f => f.idtbpdett === e.data.idtbpdett);
      this.listdata = this.listdata.filter(f => f.idtbpdett != e.data.idtbpdett);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  get(){
    if(this.TbpSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.TbpSelected.idtbp)
        .subscribe(resp => {
          this.listdata = [...resp];
          this.loading = false;
          this.service.setDataSelected(null);
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
  dataKlick(e: ITbpdett){
    this.dataSelected = e;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.TbpSelected = null;
    this.indexSubs.unsubscribe();
    this.service.setDataSelected(null);
  }
}
