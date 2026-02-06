import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SshService } from 'src/app/core/services/ssh.service';

@Component({
  selector: 'app-look-ssh',
  templateUrl: './look-ssh.component.html',
  styleUrls: ['./look-ssh.component.scss']
})
export class LookSshComponent implements OnInit {
  Idrek: number = 0;
  listkelompok: any[] = [];
  kelompokselected: any | null;
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: SshService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  changeKelompok(e: any){
    if(this.kelompokselected){
      this.gets();
    }
  }
  gets(){
    this.loading = true;
    this.listdata = [];
    this.msg = [];
    this.service.gets(this.kelompokselected.kode, this.Idrek).subscribe(resp => {
      this.listdata = [];
      if(resp.length > 0){
        this.listdata = resp;
      } else {
        this.msg.push({severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tersedia'});
      }
      this.loading = false;
    }, (error) => {
      this.loading = false;
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
    this.callback.emit(e);
    this.onHide();
  }
  onShow(){
    this.listkelompok = [
      {kode: '1', uraian: 'SSH'},
      {kode: '2', uraian: 'HSPK'},
      {kode: '3', uraian: 'ASB'},
      {kode: '4', uraian: 'SBU'}
    ];
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.showThis = false;
    this.msg = [];
    this.Idrek = 0;
  }
}
