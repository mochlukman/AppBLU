import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { IStdharga } from 'src/app/core/interface/istdharga';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StdhargaService } from 'src/app/core/services/stdharga.service';

@Component({
  selector: 'app-look-stdharga',
  templateUrl: './look-stdharga.component.html',
  styleUrls: ['./look-stdharga.component.scss']
})
export class LookStdhargaComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IStdharga[] = [];
  userInfo: ITokenClaim;
  totalRecords: number;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: StdhargaService,
    private auth: AuthenticationService) {
      this.userInfo = this.auth.getTokenInfo();
    }
  ngOnInit() {
  }
  gets(event: LazyLoadEvent){
    this.loading = true;
    this.service._start = event.first;
    this.service._rows = event.rows;
    this.service._sortField = event.sortField;
    this.service._sortOrder = event.sortOrder;
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
  pilih(e: IStdharga){
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
    this.showThis = false;
    this.msg = [];
  }
}