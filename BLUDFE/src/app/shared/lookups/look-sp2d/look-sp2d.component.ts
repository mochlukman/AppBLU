import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LazyLoadEvent, Message} from 'primeng/api';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ISpd } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { Sp2dService } from 'src/app/core/services/sp2d.service';

@Component({
  selector: 'app-look-sp2d',
  templateUrl: './look-sp2d.component.html',
  styleUrls: ['./look-sp2d.component.scss']
})
export class LookSp2dComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ISp2d[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  totalRecords: number = 0;
  params: any;
  constructor(
    private service: Sp2dService,
    private auth: AuthenticationService,
    private cdRef: ChangeDetectorRef
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(event: LazyLoadEvent) {
    this.loading = true;
    this.cdRef.detectChanges();
    this.listdata = [];
    this.totalRecords = 0;
    const params = {
      'Start': event.first,
      'Rows': event.rows,
      'GlobalFilter': event.globalFilter ? event.globalFilter : '',
      'SortField': event.sortField,
      'SortOrder': event.sortOrder,
      ...this.params,
    };
    this.service.getPaging(params).subscribe(resp => {
      if (resp.totalrecords > 0) {
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
        for(var i = 0; i < error.error.error; i++){
          this.msg.push({severity: 'error', summary: 'Error', detail: error.error.error[i]});
        }
      } else {
        this.msg.push({severity: 'error', summary: 'Error', detail: error.error});
      }
    });
  }
  pilih(e: ISpd){
    this.callback.emit(e);
    this.onHide();
  }
  onShow(){
    if (this.dt) this.dt.reset();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.showThis = false;
    this.msg = []
    this.totalRecords = 0;
  }
}
