import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LazyLoadEvent, Message} from 'primeng/api';
import {IDaftrekening} from 'src/app/core/interface/idaftrekening';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {DaftrekeningService} from 'src/app/core/services/daftrekening.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-look-dafrek-by-jnsakun',
  templateUrl: './look-dafrek-by-jnsakun.component.html',
  styleUrls: ['./look-dafrek-by-jnsakun.component.scss']
})
export class LookDafrekByJnsakunComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IDaftrekening[] = [];
  userInfo: ITokenClaim;
  kode: string;
  totalRecords: number;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  params: any;
  constructor(
    private service: DaftrekeningService,
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
    this.service.getByJnsakunType(this.params).subscribe(resp => {
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
  pilih(e: IDaftrekening){
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
  }
}
