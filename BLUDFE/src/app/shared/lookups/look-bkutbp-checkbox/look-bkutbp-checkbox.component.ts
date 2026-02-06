import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IBkutbp } from 'src/app/core/interface/ibkutbp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkutbpService } from 'src/app/core/services/bkutbp.service';

@Component({
  selector: 'app-look-bkutbp-checkbox',
  templateUrl: './look-bkutbp-checkbox.component.html',
  styleUrls: ['./look-bkutbp-checkbox.component.scss']
})
export class LookBkutbpCheckboxComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IBkutbp[] = [];
  dataSelected: IBkutbp;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: BkutbpService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(Idunit:number,Idbend:number){
    this.loading = true;
    this.listdata = [];
    this.service.gets(Idunit, Idbend).subscribe(resp => {     
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
  getsForSpjtr(Idspjtr: number, Idunit:number, Idbend:number){
    this.loading = true;
    this.listdata = [];
    this.service.getsForSpjtr(Idspjtr, Idunit, Idbend).subscribe(resp => {     
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