import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ISpd } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpdService } from 'src/app/core/services/spd.service';

@Component({
  selector: 'app-look-spd',
  templateUrl: './look-spd.component.html',
  styleUrls: ['./look-spd.component.scss']
})
export class LookSpdComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ISpd[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: SpdService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(Idunit: number, Idxkode?: number){
    this.loading = true;
    if(Idxkode){
      this.service.gets(Idunit, Idxkode).subscribe(resp => {
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
    } else {
      this.service.getsByUnit(Idunit).subscribe(resp => {
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
    
  }
  pilih(e: ISpd){
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