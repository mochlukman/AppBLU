import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftrekeningService } from 'src/app/core/services/daftrekening.service';

@Component({
  selector: 'app-look-daftrek-byspddetr',
  templateUrl: './look-daftrek-byspddetr.component.html',
  styleUrls: ['./look-daftrek-byspddetr.component.scss']
})
export class LookDaftrekByspddetrComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IDaftrekening[] = [];
  dataSelected: IDaftrekening;
  userInfo: ITokenClaim;
  listRekExist: number[] = [];
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: DaftrekeningService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(Idspd: number, Idkeg?: number){
    this.loading = true;
    this.listdata = [];
    this.service.getBySpddetr(Idspd, Idkeg).subscribe(resp => {     
      if(resp.length > 0){
        if(this.listRekExist.length > 0){
          this.listdata = resp.filter(f => !this.listRekExist.includes(f.idrek));
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
    this.listRekExist = [];
  }
}
