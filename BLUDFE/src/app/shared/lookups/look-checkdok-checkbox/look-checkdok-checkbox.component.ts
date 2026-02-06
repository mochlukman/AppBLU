import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ICheckdok } from 'src/app/core/interface/icheckdok';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { CheckdokService } from 'src/app/core/services/checkdok.service';

@Component({
  selector: 'app-look-checkdok-checkbox',
  templateUrl: './look-checkdok-checkbox.component.html',
  styleUrls: ['./look-checkdok-checkbox.component.scss']
})
export class LookCheckdokCheckboxComponent implements OnInit {
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  private Idspp: number;
  set _idspp(e: number){
    this.Idspp = e;
  }
  private Idsp2d: number;
  set _idsp2d(e: number){
    this.Idsp2d = e;
  }
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ICheckdok[] = [];
  dataSelected: ICheckdok;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: CheckdokService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }
  ngOnInit() {
  }
  gets(){
    this.listdata = [];
    this.loading = true;
    this.service._idxkode = this.Idxkode;
    this.service._idspp = this.Idspp;
    this.service._idsp2d = this.Idsp2d;
    this.service.gets().subscribe(resp => {
      this.listdata = resp;
      this.loading = false;
    }, error => {
      this.loading = false;
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
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
    this.title = '';
    this.listdata = [];
    this.showThis = false;
    this.dataSelected = null;
    this.msg = [];
  }
}
