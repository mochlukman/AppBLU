import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ITbp } from 'src/app/core/interface/itbp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { TbpService } from 'src/app/core/services/tbp.service';

@Component({
  selector: 'app-look-tbp',
  templateUrl: './look-tbp.component.html',
  styleUrls: ['./look-tbp.component.scss']
})
export class LookTbpComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ITbp[] = [];
  userInfo: ITokenClaim;
  listExist: number[] = [];
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: TbpService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(Idunit: number, Kdstatus: string, Idxkode: number, Idbend?: number, Isvalid?: boolean, ExceptTbpsts: boolean = false){
    this.loading = true;
    this.service.gets(Idunit, Kdstatus, Idxkode, Idbend, Isvalid, ExceptTbpsts).subscribe(resp => {
      this.listdata = [];
      if(resp.length > 0){
        this.listdata = [...resp];
        this.listdata = this.listdata.filter((f: any) => !this.listExist.includes(f.idtbp));
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

  pilih(e: ITbp){
    this.callback.emit(e);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.showThis = false;
    this.msg = [];
  }
}
