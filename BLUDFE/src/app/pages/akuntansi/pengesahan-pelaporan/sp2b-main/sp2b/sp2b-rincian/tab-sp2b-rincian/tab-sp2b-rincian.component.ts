import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {Sp2bdetService} from 'src/app/core/services/sp2bdet.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {DialogService} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-tab-sp2b-rincian',
  templateUrl: './tab-sp2b-rincian.component.html',
  styleUrls: ['./tab-sp2b-rincian.component.scss']
})
export class TabSp2bRincianComponent implements OnInit, OnChanges, OnDestroy {
  @Input() rootSelected : any;
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  constructor(
    private auth: AuthenticationService,
    private service: Sp2bdetService,
    private notif: NotifService,
    public dialog: DialogService,
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.rootSelected;
    this.gets();
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    const params = {
      Idsp2b: this.rootSelected.idsp2b
    };
    this.service.rincianSP2B(params).subscribe(resp => {
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
