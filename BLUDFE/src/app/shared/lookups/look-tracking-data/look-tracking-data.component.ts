import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { ITrackingdata } from 'src/app/core/interface/iglobal';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppService } from 'src/app/core/services/spp.service';
import { SpmService } from 'src/app/core/services/spm.service';
@Component({
  selector: 'app-look-tracking-data',
  templateUrl: './look-tracking-data.component.html',
  styleUrls: ['./look-tracking-data.component.scss']
})
export class LookTrackingDataComponent implements OnInit {
  private TypeData: string; // Data mana yang mw di ambil ? spp ? spm ?
  set _typedata(e: string){
    this.TypeData = e;
  }
  private Iddata: number;
  set _iddata(e: number){
    this.Iddata = e;
  }
  loading_post: boolean;
  showThis: boolean;
  title: string;
  msg: Message[];
  userInfo: ITokenClaim;
  listdata: ITrackingdata[] = [];
  constructor(
    private authService: AuthenticationService,
    private sppService: SppService,
    private spmService: SpmService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnInit(){
  }
  gets(){
    this.loading_post = true;
    if(this.TypeData == 'spp'){
      this.sppService.tracking(this.Iddata).subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        }
        this.loading_post = false;
      }, error => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
        this.loading_post = false;
      });
    } else if(this.TypeData == 'spm'){
      this.spmService.tracking(this.Iddata).subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
          this.listdata.forEach((v, i) => {
          });
        }
        this.loading_post = false;
      }, error => {
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
        this.loading_post = false;
      });
    }
  }
  onShow(){
    this.gets();
  }
  onHide(){
    this.showThis = false;
    this.msg = [];
    this.loading_post = false;
    this.listdata = [];
  }
}
