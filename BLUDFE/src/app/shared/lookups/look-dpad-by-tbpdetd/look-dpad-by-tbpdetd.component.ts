import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IDpad } from 'src/app/core/interface/idpad';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DpadService } from 'src/app/core/services/dpad.service';

@Component({
  selector: 'app-look-dpad-by-tbpdetd',
  templateUrl: './look-dpad-by-tbpdetd.component.html',
  styleUrls: ['./look-dpad-by-tbpdetd.component.scss']
})
export class LookDpadByTbpdetdComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IDpad[] = [];
  dataSelected: IDpad;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: DpadService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(param: any){
    this.loading = true;
    this.listdata = [];
    this.service._idunit = param.Idunit ? param.Idunit : null;
    this.service._idtbp = param.Idtbp ? param.Idtbp : null;
    this.service._idsts = param.Idsts ? param.Idsts : null;
    this.service.gets().subscribe(resp => {
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
