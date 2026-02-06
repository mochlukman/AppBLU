import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISppdetr } from 'src/app/core/interface/isppdetr';
import { ISppdetrp } from 'src/app/core/interface/isppdetrp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { SppdetrpService } from 'src/app/core/services/sppdetrp.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-spm-ls-nonpegawai-pajak',
  templateUrl: './spm-ls-nonpegawai-pajak.component.html',
  styleUrls: ['./spm-ls-nonpegawai-pajak.component.scss']
})
export class SpmLsNonpegawaiPajakComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  rekeningSelected: ISppdetr;
  subRekeing: Subscription;
  listdata: ISppdetrp[] = [];
  dataSelected: ISppdetrp;
  loading: boolean;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static: false}) dt: any;
  constructor(
    private sppdetrService: SppdetrService,
    private service: SppdetrpService,
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
      let index = this.listdata.findIndex(f => f.idsppdetrp === e.data.idsppdetrp);
      this.listdata = this.listdata.filter(f => f.idsppdetrp != e.data.idsppdetrp);
      this.listdata.splice(index, 0, e.data);
      if(this.dt) this.dt.resetPageOnSort = false;
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
    this.subRekeing.unsubscribe();
  }
}
