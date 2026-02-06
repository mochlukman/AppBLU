import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {PotonganService} from 'src/app/core/services/potongan.service';

@Component({
  selector: 'app-look-potongan',
  templateUrl: './look-potongan.component.html',
  styleUrls: ['./look-potongan.component.scss']
})
export class LookPotonganComponent implements OnInit {
  showThis: boolean;
  msg: Message[];
  loading: boolean;
  listData: any[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callBack = new EventEmitter();
  constructor(
    private service: PotonganService,
    private auth: AuthenticationService) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(parameter: any){
    this.loading = true;
    this.service.gets(parameter).subscribe(resp => {
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
  pilih(e: any){
    this.callBack.emit(e);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.listData = [];
    this.showThis = false;
  }
}
