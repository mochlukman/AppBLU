import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Sp2dService } from 'src/app/core/services/sp2d.service';

@Component({
  selector: 'app-look-sp2d-by-dp-info',
  templateUrl: './look-sp2d-by-dp-info.component.html',
  styleUrls: ['./look-sp2d-by-dp-info.component.scss']
})
export class LookSp2dByDpInfoComponent implements OnInit {
  private Iddp: number;
  set _iddp(e: number){
    this.Iddp = e;
  }
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ISp2d[] = [];
  userInfo: ITokenClaim;
  totalRecords: number;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: Sp2dService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }
  ngOnInit() {
  }
  gets(event: LazyLoadEvent){
    this.loading = true;
    this.listdata = [];
    this.service._start = event.first;
    this.service._rows = event.rows;
    this.service._globalFilter = event.globalFilter;
    this.service._iddp = this.Iddp;
    this.service.getByDp().subscribe(resp => {
      if(resp.totalrecords > 0){
        this.totalRecords = resp.totalrecords;
        this.listdata = resp.data;
      } else {
        this.msg = [];
        this.msg.push({severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tersedia'});
      }
      this.loading = false;
    }, error => {
      this.loading = false;
      this.msg = [];
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error.length; i++){
          this.msg.push({severity: 'error', summary: 'Error', detail: error.error.error[i]});
        }
      } else {
        this.msg.push({severity: 'error', summary: 'Error', detail: error.error});
      }
    });
  }
  onShow(event: LazyLoadEvent){
    this.gets(event);
  }
  onHide(){
    this.dt._first = 0;
    this.dt._globalFilter = '';
    this.title = '';
    this.listdata = [];
    this.showThis = false;
    this.msg = [];
  }
}