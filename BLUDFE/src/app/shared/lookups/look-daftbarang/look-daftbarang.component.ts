import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftarBarangService } from 'src/app/core/services/daftar-barang.service';

@Component({
  selector: 'app-look-daftbarang',
  templateUrl: './look-daftbarang.component.html',
  styleUrls: ['./look-daftbarang.component.scss']
})
export class LookDaftbarangComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: any[] = [];
  userInfo: ITokenClaim;
  totalRecords: number;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: DaftarBarangService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }
  ngOnInit() {
  }
  gets(event: LazyLoadEvent){
    this.loading = true;
    this.service._start = event.first;
    this.service._rows = event.rows;
    this.service._globalFilter = event.globalFilter;
    this.service.paging().subscribe(resp => {
      this.totalRecords = resp.totalrecords;
      this.listdata = resp.data;
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
  pilih(e: any){
    this.callback.emit(e);
    this.onHide();
  }
  onShow(event: LazyLoadEvent){
    this.gets(event);
  }
  onHide(){
    this.dt._first = 0;
    this.dt._globalFilter = '';
    this.title = '';
    this.listdata = [];
    this.msg = [];
    this.showThis = false;
  }
}