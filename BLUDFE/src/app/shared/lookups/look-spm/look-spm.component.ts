import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LazyLoadEvent, Message} from 'primeng/api';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpmService } from 'src/app/core/services/spm.service';

@Component({
  selector: 'app-look-spm',
  templateUrl: './look-spm.component.html',
  styleUrls: ['./look-spm.component.scss']
})
export class LookSpmComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ISpm[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  totalRecords: number = 0;
  params: any;
  constructor(
    private service: SpmService,
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
    this.service.paging(params).subscribe(resp => {
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
  pilih(e: ISpm){
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
  }
}
