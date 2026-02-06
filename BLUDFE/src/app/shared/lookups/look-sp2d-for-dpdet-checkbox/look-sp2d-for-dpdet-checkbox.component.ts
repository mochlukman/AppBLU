import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Sp2dService } from 'src/app/core/services/sp2d.service';

@Component({
  selector: 'app-look-sp2d-for-dpdet-checkbox',
  templateUrl: './look-sp2d-for-dpdet-checkbox.component.html',
  styleUrls: ['./look-sp2d-for-dpdet-checkbox.component.scss']
})
export class LookSp2dForDpdetCheckboxComponent implements OnInit {
  private Iddp: number;
  set _iddp(e: number){
    this.Iddp = e;
  }
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ISp2d[] = [];
  dataSelected: ISp2d;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: Sp2dService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    this.service.getForDpdet(this.Iddp, this.Idxkode).subscribe(resp => {     
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
  onShow(){
    this.gets();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.dataSelected = null;
    this.showThis = false;
    this.msg = [];
  }
}