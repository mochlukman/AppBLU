import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILpj } from 'src/app/core/interface/ilpj';
import { ISpjLpj } from 'src/app/core/interface/ispj-lpj';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { LpjDetailService } from 'src/app/core/services/lpj-detail.service';
import { SpjLpjService } from 'src/app/core/services/spj-lpj.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { LpjPengesahanRincianLpjComponent } from '../lpj-pengesahan-rincian-lpj/lpj-pengesahan-rincian-lpj.component';

@Component({
  selector: 'app-lpj-pengesahan-rincian',
  templateUrl: './lpj-pengesahan-rincian.component.html',
  styleUrls: ['./lpj-pengesahan-rincian.component.scss']
})
export class LpjPengesahanRincianComponent implements OnInit, OnChanges, OnDestroy {
  loading: boolean;
  @Input() lpjSelected: ILpj;
  userInfo: ITokenClaim;
  indexSubs : Subscription;
  index: number;
  listdata: ISpjLpj[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  @ViewChild(LpjPengesahanRincianLpjComponent, {static: true}) RincianSPJ : LpjPengesahanRincianLpjComponent;
  constructor(
    private lpjdetail : LpjDetailService,
    private service : SpjLpjService,
    private notif: NotifService,
    private auth : AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
    this.indexSubs = this.lpjdetail._tabIndex.subscribe(resp => {
      this.index = resp;
      if(this.index == 0){
        this.get();
      } else {
        this.listdata = [];
      }
    });
   }
  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.lpjSelected.currentValue){
      this.get();
    }
  }
  get(){
    if(this.lpjSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.lpjSelected.idlpj)
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
  callback(e: any){
    if(e.added){
      this.listdata.push(...e.data);
      if(this.dt) this.dt.reset();
    }
  }
  delete(e: ISpjLpj){
    this.notif.confir({
			message: ``,
			accept: () => {
				this.service.delete(e.idspjlpj).subscribe(
					(resp) => {
						if (resp.ok) {
              this.listdata = this.listdata.filter(f => f.idspjlpj !== e.idspjlpj);
              this.notif.success('Data berhasil dihapus');
              if(this.dt) this.dt.reset();
						}
					}, (error) => {
            if(Array.isArray(error.error.error)){
              for(var i = 0; i < error.error.error.length; i++){
                this.notif.error(error.error.error[i]);
              }
            } else {
              this.notif.error(error.error);
            }
          });
			},
			reject: () => {
				return false;
			}
		});
  }
  detailSPJ(d: ISpjLpj){
    this.RincianSPJ.title = `Rincian SPJ : ${d.idspjNavigation.nospj}`;
    this.RincianSPJ.spjSelected = d.idspjNavigation;
    this.RincianSPJ.showThis = true;
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.lpjSelected = null;
    this.indexSubs.unsubscribe();
  }
}
