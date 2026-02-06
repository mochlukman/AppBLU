import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ISts } from 'src/app/core/interface/ists';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsService } from 'src/app/core/services/sts.service';

@Component({
  selector: 'app-look-sts-for-bku',
  templateUrl: './look-sts-for-bku.component.html',
  styleUrls: ['./look-sts-for-bku.component.scss']
})
export class LookStsForBkuComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ISts[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: StsService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(Idunit: number, Idbend: number, Kdstatus?: string, Idxkode?: number){
    this.loading = true;
    this.service.forBku(Idunit, Idbend, Kdstatus, Idxkode).subscribe(resp => {
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
  pilih(e: ISts){
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