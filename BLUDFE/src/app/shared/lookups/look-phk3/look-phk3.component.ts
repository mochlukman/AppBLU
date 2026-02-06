import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IDaftphk3 } from 'src/app/core/interface/idaftphk3';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Daftphk3Service } from 'src/app/core/services/daftphk3.service';

@Component({
  selector: 'app-look-phk3',
  templateUrl: './look-phk3.component.html',
  styleUrls: ['./look-phk3.component.scss']
})
export class LookPhk3Component implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listData: IDaftphk3[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callBack = new EventEmitter();
  constructor(
    private service: Daftphk3Service,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(Idunit: number){
    this.loading = true;
    this.service.gets(Idunit).subscribe(resp => {
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
  pilih(e: IDaftphk3){
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
