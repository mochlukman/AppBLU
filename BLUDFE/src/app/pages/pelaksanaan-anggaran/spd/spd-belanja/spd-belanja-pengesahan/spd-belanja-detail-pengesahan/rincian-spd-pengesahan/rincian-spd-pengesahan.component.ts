import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISpd, ISpddetrTreeRoot } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpddetrService } from 'src/app/core/services/spddetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-rincian-spd-pengesahan',
  templateUrl: './rincian-spd-pengesahan.component.html',
  styleUrls: ['./rincian-spd-pengesahan.component.scss']
})
export class RincianSpdPengesahanComponent implements OnInit, OnDestroy, OnChanges {
  listdata: ISpddetrTreeRoot[] = [];
  @Input() SpdSelected : ISpd;
  @ViewChild('dt',{static:false}) dt: any;
  userInfo: ITokenClaim;
  indexSubs : Subscription;
  loading: boolean;
  index: number;
  constructor(
    private service: SpddetrService,
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
    this.SpdSelected;
    if(this.index == 0) this.get()
  }
  ngOnInit() {
  }  
  get(){
    if(this.SpdSelected){
      if(this.dt) this.dt.reset();
      this.loading = true;
      this.listdata = [];
      this.service.getsTreeTable(this.SpdSelected.idspd)
        .subscribe(resp => {
          if(resp.length){
            let temp: ISpddetrTreeRoot[] = Object.assign(resp); 
            temp.forEach(a => {
              let temp_total_nilai = 0;
              if(a.children.length > 0){
                a.children.forEach(b => {
                  temp_total_nilai += b.data.nilai;
                });
                a.data.nilai += temp_total_nilai;
              }
            });
            this.listdata = [...temp];
          } else {
            this.notif.info('Data Rekening Tidak Tersedia');
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
    }
  }
  ngOnDestroy(): void {
    this.listdata = [];
    this.indexSubs.unsubscribe();
  }
}
