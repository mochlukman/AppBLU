import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ISppdetr} from 'src/app/core/interface/isppdetr';
import {Subscription} from 'rxjs';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {SppdetrService} from 'src/app/core/services/sppdetr.service';
import {SppdetrpotService} from 'src/app/core/services/sppdetrpot.service';
import {NotifService} from 'src/app/core/_commonServices/notif.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-spm-ls-pegawai-potongan-ver',
  templateUrl: './spm-ls-pegawai-potongan-ver.component.html',
  styleUrls: ['./spm-ls-pegawai-potongan-ver.component.scss']
})
export class SpmLsPegawaiPotonganVerComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  rekeningSelected: ISppdetr;
  subRekeing: Subscription;
  listdata: any[] = [];
  dataSelected: any;
  loading: boolean;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: false}) dt: any;
  constructor(
    private sppdetrService: SppdetrService,
    private service: SppdetrpotService,
    private notif: NotifService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
    this.subRekeing = this.sppdetrService._dataSelected.subscribe(resp => {
      this.rekeningSelected = resp;
      this.get();
    });
  }

  ngOnInit() {
  }
  get(){
    if(this.rekeningSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.rekeningSelected.idsppdetr)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = resp;
          } else {
            this.notif.info('Data Tidak Tersedia');
          }
          this.loading = false;
        }, (error) => {
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
  onChangeTab(e: any){
  }
  callback(e: any){
    if(e.added){
      this.listdata.push(e.data);
      if(this.dt) this.dt.reset();
    } else if(e.edited){
      let index = this.listdata.findIndex((f: any) => f.idsppdetrpot === e.data.idsppdetrpot);
      this.listdata = this.listdata.filter(f => f.idsppdetrpot != e.data.idsppdetrpot);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
    }
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.subRekeing.unsubscribe();
  }
}
