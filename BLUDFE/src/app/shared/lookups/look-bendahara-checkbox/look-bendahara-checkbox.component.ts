import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { Ibend } from 'src/app/core/interface/ibend';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BendService } from 'src/app/core/services/bend.service';

@Component({
  selector: 'app-look-bendahara-checkbox',
  templateUrl: './look-bendahara-checkbox.component.html',
  styleUrls: ['./look-bendahara-checkbox.component.scss']
})
export class LookBendaharaCheckboxComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: Ibend[] = [];
  dataSelected: Ibend;
  userInfo: ITokenClaim;
  listBendExist: number[] = [];
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: BendService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(Idunit: number, Jnsbend?: string){
    this.loading = true;
    this.listdata = [];
    this.service.gets(Idunit, Jnsbend).subscribe(resp => {     
      if(resp.length > 0){
        if(this.listBendExist.length > 0){
          this.listdata = resp.filter(f => !this.listBendExist.includes(f.idbend));
        } else {
          this.listdata = [...resp];
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
    this.listBendExist = [];
  }
}