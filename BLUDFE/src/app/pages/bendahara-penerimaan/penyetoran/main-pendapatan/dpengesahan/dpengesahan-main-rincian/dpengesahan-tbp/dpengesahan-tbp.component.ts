import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISts } from 'src/app/core/interface/ists';
import { ITbpsts } from 'src/app/core/interface/itbpsts';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TbpstsService } from 'src/app/core/services/tbpsts.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-dpengesahan-tbp',
  templateUrl: './dpengesahan-tbp.component.html',
  styleUrls: ['./dpengesahan-tbp.component.scss']
})
export class DpengesahanTbpComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ITbpsts[] = [];
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  group1: boolean;
  group2: boolean;
  constructor(
    private service: TbpstsService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.group1 = false;
    this.group2 = false;
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.StsSelected && this.tabIndex == 0){
      if(['16','60','63'].indexOf(this.StsSelected.kdstatus.trim()) > -1){
        this.group1 = true;
        this.group2 = false;
      }
      if(['61','64'].indexOf(this.StsSelected.kdstatus.trim()) > -1){
        this.group1 = false;
        this.group2 = true;
      }
      this.get();
    }
  }
  ngOnInit() {
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    }
  }
  get(){
    if(this.StsSelected){
      this.loading = true;
      this.listdata = [];
      this.service.bySts(this.StsSelected.idsts)
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
    this.StsSelected = null;
  }
}
