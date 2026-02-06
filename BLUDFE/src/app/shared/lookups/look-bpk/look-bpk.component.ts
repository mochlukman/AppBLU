import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IBpk } from 'src/app/core/interface/ibpk';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkService } from 'src/app/core/services/bpk.service';

@Component({
  selector: 'app-look-bpk',
  templateUrl: './look-bpk.component.html',
  styleUrls: ['./look-bpk.component.scss']
})
export class LookBpkComponent implements OnInit {
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }

  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IBpk[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: BpkService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  
  gets(Kdstatus: string, Idxkode: number, Idunit: number){
    this.loading = true;
    this.service.gets(Kdstatus,Idxkode,Idunit).subscribe(resp => {
      this.listdata = [];
      if(resp.length > 0){ 
        this.listdata = [...resp];
      } else {
        this.msg = [];
        this.msg.push({severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tersedia'});
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.msg = [];
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error; i++){
          this.msg.push({severity: 'error', summary: 'Error', detail: error.error.error[i]});
        }
      } else {
        this.msg.push({severity: 'error', summary: 'Error', detail: error.error});
      }
    });
  }
  getForbku(Idunit: number, Idbend: number){
    this.loading = true;
    this.service.getForBku(Idunit,Idbend).subscribe(resp => {
      this.listdata = [];
      if(resp.length > 0){
        this.listdata = [...resp];
      } else {
        this.msg = [];
        this.msg.push({severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tersedia'});
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.msg = [];
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error; i++){
          this.msg.push({severity: 'error', summary: 'Error', detail: error.error.error[i]});
        }
      } else {
        this.msg.push({severity: 'error', summary: 'Error', detail: error.error});
      }
    });
  }
  pilih(e: IBpk){
    this.callback.emit(e);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.showThis = false;
  }
}