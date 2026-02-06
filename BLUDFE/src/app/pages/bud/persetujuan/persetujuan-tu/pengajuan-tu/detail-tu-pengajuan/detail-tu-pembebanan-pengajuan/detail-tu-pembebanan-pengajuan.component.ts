import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISpp } from 'src/app/core/interface/ispp';
import { ISppdetrTreeRoot } from 'src/app/core/interface/isppdetr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-detail-tu-pembebanan-pengajuan',
  templateUrl: './detail-tu-pembebanan-pengajuan.component.html',
  styleUrls: ['./detail-tu-pembebanan-pengajuan.component.scss']
})
export class DetailTuPembebananPengajuanComponent implements OnInit, OnDestroy, OnChanges {
  @Input() tabIndex: number = 0;
  loading: boolean;
  listdata: ISppdetrTreeRoot[] = [];
  @Input() SppSelected : ISpp;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private service: SppdetrService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SppSelected;
    if(this.tabIndex == 0){
      this.get();
    } else {
      this.listdata = [];
    }
  }
  ngOnInit() {
  }
  get(){
    if(this.SppSelected && this.tabIndex == 0){
      this.loading = true;
      this.listdata = [];
      this.service.getsTreeTable(this.SppSelected.idspp)
        .subscribe(resp => {
          if(resp.length > 0){
            let temp: ISppdetrTreeRoot[] = Object.assign(resp); 
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
    this.SppSelected = null;
  }
}