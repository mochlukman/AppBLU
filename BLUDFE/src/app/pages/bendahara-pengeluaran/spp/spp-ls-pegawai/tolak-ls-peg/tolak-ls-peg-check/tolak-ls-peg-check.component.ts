import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ISppcheckdok } from 'src/app/core/interface/isppcheckdok';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppcheckdokService } from 'src/app/core/services/sppcheckdok.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-tolak-ls-peg-check',
  templateUrl: './tolak-ls-peg-check.component.html',
  styleUrls: ['./tolak-ls-peg-check.component.scss']
})
export class TolakLsPegCheckComponent implements OnInit {
  private Idspp: number;
  set _idspp(e: number){
    this.Idspp = e;
  }
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  showThis: boolean;
  title: string = '';
  loading: boolean = false;
  listdata: ISppcheckdok[] = [];
  msg: Message[];
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:true}) dt: any;
  isvalid: boolean = false;
  constructor(
    private service: SppcheckdokService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }

  ngOnInit() {
  }
  get(){
    this.listdata = [];
      if(this.loading) this.loading = true;
      this.service._idspp = this.Idspp;
      this.service.gets().subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        }
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.msg = []
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }      
      });
  }
  onShow(){
    this.get();
  }
  onHide(){
    this.listdata = [];
    this.loading = false;
    this.msg = [];
    this.showThis = false;
  }
}