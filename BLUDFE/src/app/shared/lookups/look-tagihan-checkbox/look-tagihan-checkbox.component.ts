import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {ITagihan} from 'src/app/core/interface/itagihan';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {TagihanService} from 'src/app/core/services/tagihan.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-look-tagihan-checkbox',
  templateUrl: './look-tagihan-checkbox.component.html',
  styleUrls: ['./look-tagihan-checkbox.component.scss']
})
export class LookTagihanCheckboxComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ITagihan[] = [];
  userInfo: ITokenClaim;
  dataSelected: ITagihan;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callBack = new EventEmitter();
  constructor(
    private service: TagihanService,
    private auth: AuthenticationService) {
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
  pilih(){
    this.callBack.emit(this.dataSelected);
    this.onHide();
  }
  onHide(){
    if(this.dt) this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.showThis = false;
    this.msg = [];
    this.dataSelected = null;
  }
}
