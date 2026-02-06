import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Message} from 'primeng/api';
import {IBpkpajak} from 'src/app/core/interface/ibpkpajak';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {BpkpajakService} from 'src/app/core/services/bpkpajak.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-look-pungutan-pajak-view',
  templateUrl: './look-pungutan-pajak-view.component.html',
  styleUrls: ['./look-pungutan-pajak-view.component.scss']
})
export class LookPungutanPajakViewComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listData: IBpkpajak[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callBack = new EventEmitter();
  constructor(
    private service: BpkpajakService,
    private auth: AuthenticationService) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(){
    this.loading = true;
    this.service.gets().subscribe(resp => {
      this.listData = [];
      if(resp.length > 0){
        this.listData = [...resp];
      } else {
        this.msg = [];
        this.msg.push({severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tersedia / Sudah Digunakan Semua'});
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
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listData = [];
    this.showThis = false;
    this.msg = [];
  }
}
