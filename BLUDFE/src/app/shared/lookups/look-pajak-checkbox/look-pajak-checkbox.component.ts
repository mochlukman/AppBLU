import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { IPajak } from 'src/app/core/interface/ipajak';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { PajakService } from 'src/app/core/services/pajak.service';

@Component({
  selector: 'app-look-pajak-checkbox',
  templateUrl: './look-pajak-checkbox.component.html',
  styleUrls: ['./look-pajak-checkbox.component.scss']
})
export class LookPajakCheckboxComponent implements OnInit {
  private Idjnspajak: number;
  set _idjnspajak(e: number){
    this.Idjnspajak = e;
  }
  private Idsppdetr: number;
  set _idsppdetr(e: number){
    this.Idsppdetr = e;
  }
  private Idbpkpajak: number;
  set _idbpkpajak(e: number){
    this.Idbpkpajak = e;
  }
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listData: IPajak[] = [];
  dataSelected: IPajak;
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callBack = new EventEmitter();
  constructor(
    private service: PajakService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }

  ngOnInit() {
  }
  gets(){
    this.loading = true;
    this.service._idsppdetr = this.Idsppdetr;
    this.service._idbpkpajak = this.Idbpkpajak;
    this.service._idjnspajak = this.Idjnspajak;
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
  }
}
