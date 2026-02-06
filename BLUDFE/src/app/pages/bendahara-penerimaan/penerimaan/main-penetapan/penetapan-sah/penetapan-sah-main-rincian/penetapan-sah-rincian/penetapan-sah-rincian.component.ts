import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ITbp } from 'src/app/core/interface/itbp';
import { ITbpdetd } from 'src/app/core/interface/itbpdetd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TbpdetdService } from 'src/app/core/services/tbpdetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-penetapan-sah-rincian',
  templateUrl: './penetapan-sah-rincian.component.html',
  styleUrls: ['./penetapan-sah-rincian.component.scss']
})
export class PenetapanSahRincianComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  listdata: ITbpdetd[] = [];
  @Input() TbpSelected : ITbp;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  indexSubs : Subscription;
  index: number;
  dataSelected: ITbpdetd;
  subDataSelected: Subscription;
  constructor(
    private service: TbpdetdService,
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
    this.subDataSelected = this.service._dataSelected.subscribe(resp => {
      this.dataSelected = resp;
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.TbpSelected;
    if(this.index == 0) this.get();
  }
  ngOnInit() {
  }
  get(){
    if(this.TbpSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.TbpSelected.idtbp)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.notif.info('Data Tidak Tersedia');
          }

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
  dataKlick(e: ITbpdetd){
    this.service.setDataSelected(e);
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
    this.TbpSelected = null;
    this.indexSubs.unsubscribe();
    this.service.setDataSelected(null);
    this.subDataSelected.unsubscribe();
  }
}
