import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IBkbkas } from 'src/app/core/interface/ibkbkas';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkbkasService } from 'src/app/core/services/bkbkas.service';

@Component({
  selector: 'app-look-rekening-bud',
  templateUrl: './look-rekening-bud.component.html',
  styleUrls: ['./look-rekening-bud.component.scss']
})
export class LookRekeningBudComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listData: IBkbkas[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callBack = new EventEmitter();
  NoBantu: string = '';
  listNobantuSelected: string[] = [];
  Idunit: number;
  constructor(
    private service: BkbkasService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(){
    this.loading = true;
    this.service.gets({Idunit: this.Idunit}).subscribe(resp => {
      this.listData = [];
      if(resp.length > 0){
        this.listData = [...resp];
        if(this.NoBantu != ''){
          this.listData = this.listData.filter(f => f.nobbantu.trim() != this.NoBantu.trim());
        }
        if(this.listNobantuSelected.length > 0){
          this.listData = this.listData.filter(f => !this.listNobantuSelected.includes(f.nobbantu.trim()));
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
  pilih(e: IBkbkas){
    this.callBack.emit(e);
    this.onHide();
  }
  onShow(){
    this.gets();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listData = [];
    this.showThis = false;
    this.msg = [];
    this.NoBantu = '';
    this.listNobantuSelected = [];
  }
}
