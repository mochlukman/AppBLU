import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IBpk } from 'src/app/core/interface/ibpk';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkService } from 'src/app/core/services/bpk.service';

@Component({
  selector: 'app-look-bpk-for-spj',
  templateUrl: './look-bpk-for-spj.component.html',
  styleUrls: ['./look-bpk-for-spj.component.scss']
})
export class LookBpkForSpjComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IBpk[] = [];
  dataSelected: IBpk;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: BpkService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(Idspj: number, Idunit:number, Kdstatus:string, Idbend: number){
    this.loading = true;
    this.listdata = [];
    this.service.getForSpj(Idspj, Idunit, Kdstatus, Idbend).subscribe(resp => {     
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
  pilih(){
    this.callback.emit(this.dataSelected);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.dataSelected = null;
    this.showThis = false;
  }
}