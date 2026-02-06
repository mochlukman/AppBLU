import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IBpkpajak } from 'src/app/core/interface/ibpkpajak';
import { IBpkpajakdet } from 'src/app/core/interface/ibpkpajakdet';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkpajakdetService } from 'src/app/core/services/bpkpajakdet.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pengesahan-bpk-pungutan-pajak-det',
  templateUrl: './pengesahan-bpk-pungutan-pajak-det.component.html',
  styleUrls: ['./pengesahan-bpk-pungutan-pajak-det.component.scss']
})
export class PengesahanBpkPungutanPajakDetComponent implements OnInit {
  BpkpajakSelected: IBpkpajak;
  showThis: boolean;
  loading: boolean;
  title: string;
  mode: string;
  msg: Message[];
  indoKalender: any;
  userInfo: ITokenClaim;
  @Output() callback = new EventEmitter();
  listdata: IBpkpajakdet[] = [];
  @ViewChild('dt',{static:false}) dt: any;
  constructor(
    private service: BpkpajakdetService,
    private authService: AuthenticationService,
    private notif: NotifService
  ) { 
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(){
    if(this.BpkpajakSelected){
      this.loading = true;
      this.listdata = [];
      this.service._idbpkpajak = this.BpkpajakSelected.idbpkpajak;
      this.service.gets().subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        } else {
          this.msg = [];
            
        }
        this.loading = false;
      }, error => {
        this.msg = [];
        this.loading = false;
        if (Array.isArray(error.error.error)) {
          for (var i = 0; i < error.error.error.length; i++) {
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
    }
  }
  onShow(){
    this.gets();
  }
  onHide(){
    this.listdata = [];
    this.msg = [];
    this.BpkpajakSelected = undefined;
    this.showThis = false;
  }
}