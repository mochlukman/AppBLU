import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftunitService } from 'src/app/core/services/daftunit.service';

@Component({
  selector: 'app-look-daftunit',
  templateUrl: './look-daftunit.component.html',
  styleUrls: ['./look-daftunit.component.scss']
})
export class LookDaftunitComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listData: IDaftunit[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callBack = new EventEmitter();
  constructor(
    private service: DaftunitService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(Level: string){
    this.loading = true;
    this.service.gets(Level).subscribe(resp => {
      this.listData = [];
      if(resp.length > 0){
        this.listData = [...resp];
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
  pilih(e: IDaftunit){
    this.callBack.emit(e);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listData = [];
    this.showThis = false;
  }
}
