import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ISkp } from 'src/app/core/interface/iskp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SkpService } from 'src/app/core/services/skp.service';

@Component({
  selector: 'app-look-skp',
  templateUrl: './look-skp.component.html',
  styleUrls: ['./look-skp.component.scss']
})
export class LookSkpComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ISkp[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  listSkptbpIdsExisting: number[] = [];
  constructor(
    private service: SkpService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(Idunit: number, Idbend?: number, Kdstatus?: string, Idxkode?: number, istglvalid?: boolean){
    this.loading = true;
    this.service.gets(Idunit, Idbend, Kdstatus, Idxkode, istglvalid).subscribe(resp => {
      this.listdata = [];
      if(resp.length > 0){
        this.listdata = [...resp];
        if(this.listSkptbpIdsExisting.length > 0){
          this.listdata = this.listdata.filter((f) => !this.listSkptbpIdsExisting.includes(f.idskp));
        }
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
  pilih(e: ISkp){
    this.callback.emit(e);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.showThis = false;
    this.listSkptbpIdsExisting = [];
  }
}
