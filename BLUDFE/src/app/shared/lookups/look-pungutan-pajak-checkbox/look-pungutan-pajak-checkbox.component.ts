import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IBpkpajak } from 'src/app/core/interface/ibpkpajak';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BpkpajakService } from 'src/app/core/services/bpkpajak.service';

@Component({
  selector: 'app-look-pungutan-pajak-checkbox',
  templateUrl: './look-pungutan-pajak-checkbox.component.html',
  styleUrls: ['./look-pungutan-pajak-checkbox.component.scss']
})
export class LookPungutanPajakCheckboxComponent implements OnInit {
  private Idbpk: number;
  set _idbpk(e: number){
    this.Idbpk = e;
  }
  private Kdstatus: string;
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private Idbpkpajakstr: number;
  set _idbpkpajakstr(e: number){
    this.Idbpkpajakstr = e;
  }
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idbend: number;
  set _idbend(e: number){
    this.Idbend = e;
  }
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listData: IBpkpajak[] = [];
  dataSelected: IBpkpajak;
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
    this.service._idbpk = this.Idbpk;
    this.service._kdstatus = this.Kdstatus;
    this.service._idbpkpajakstr = this.Idbpkpajakstr;
    this.service._idunit = this.Idunit;
    this.service._idbend = this.Idbend;
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
    this.callBack.emit(this.dataSelected);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listData = [];
    this.showThis = false;
    this.msg = [];
    this.dataSelected = null;
  }
}
