import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {IDaftdok} from 'src/app/core/interface/idaftdok';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {DaftdokService} from 'src/app/core/services/daftdok.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';
import {DaftreklakService} from 'src/app/core/services/daftreklak.service';

@Component({
  selector: 'app-look-rek-arus-kas',
  templateUrl: './look-rek-arus-kas.component.html',
  styleUrls: ['./look-rek-arus-kas.component.scss']
})
export class LookRekArusKasComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IDaftdok[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: DaftreklakService,
    private auth: AuthenticationService) {
    this.userInfo = this.auth.getTokenInfo();
  }

  ngOnInit() {
  }
  gets(params?: any){
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
  pilih(e: IDaftdok){
    this.callback.emit(e);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.showThis = false;
  }
}
