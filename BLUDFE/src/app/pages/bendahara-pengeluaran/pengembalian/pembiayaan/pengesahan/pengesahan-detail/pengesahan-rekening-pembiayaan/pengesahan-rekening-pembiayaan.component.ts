import { Component, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { IStsdetb } from 'src/app/core/interface/istsdetb';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetbService } from 'src/app/core/services/stsdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pengesahan-rekening-pembiayaan',
  templateUrl: './pengesahan-rekening-pembiayaan.component.html',
  styleUrls: ['./pengesahan-rekening-pembiayaan.component.scss']
})
export class PengesahanRekeningPembiayaanComponent implements OnInit {
  @Input() stsselected: any;
  loading: boolean;
  listdata: IStsdetb[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: IStsdetb;
  constructor(
    private service: StsdetbService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
    this.get();
  }
  get(){
    if(this.stsselected){
      this.loading = true;
      this.listdata = [];
      this.service.gets(this.stsselected.idsts)
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
}
