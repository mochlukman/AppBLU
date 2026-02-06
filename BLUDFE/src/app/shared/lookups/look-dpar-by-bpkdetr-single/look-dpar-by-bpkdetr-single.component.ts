import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {IDpar} from 'src/app/core/interface/idpar';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {DparService} from 'src/app/core/services/dpar.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-look-dpar-by-bpkdetr-single',
  templateUrl: './look-dpar-by-bpkdetr-single.component.html',
  styleUrls: ['./look-dpar-by-bpkdetr-single.component.scss']
})
export class LookDparByBpkdetrSingleComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IDpar[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: DparService,
    private auth: AuthenticationService) {
    this.userInfo = this.auth.getTokenInfo();
  }

  ngOnInit() {
  }
  gets(Idunit: number, Idkeg: number, Idbpk: number){
    this.loading = true;
    this.listdata = [];
    this.service.getByBpkdetr(Idunit, Idkeg, Idbpk).subscribe(resp => {
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
  pilih(e: IDpar){
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
