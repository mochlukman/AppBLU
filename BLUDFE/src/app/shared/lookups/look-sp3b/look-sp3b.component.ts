import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {IBkbank} from 'src/app/core/interface/ibkbank';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {Sp3bService} from 'src/app/core/services/sp3b.service';

@Component({
  selector: 'app-look-sp3b',
  templateUrl: './look-sp3b.component.html',
  styleUrls: ['./look-sp3b.component.scss']
})
export class LookSp3bComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: Sp3bService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(params: any){
    this.loading = true;
    this.service.gets(params).subscribe(resp => {
      this.listdata = [];
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
  pilih(e: IBkbank){
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
