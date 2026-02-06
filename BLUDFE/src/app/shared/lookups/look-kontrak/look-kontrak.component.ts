import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LazyLoadEvent, Message} from 'primeng/api';
import { IKontrak } from 'src/app/core/interface/ikontrak';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { KontrakService } from 'src/app/core/services/kontrak.service';

@Component({
  selector: 'app-look-kontrak',
  templateUrl: './look-kontrak.component.html',
  styleUrls: ['./look-kontrak.component.scss']
})
export class LookKontrakComponent implements OnInit {
 private Idphk3: number;
  set _idphk3(e: number){
    this.Idphk3 = e;
  }
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IKontrak[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  totalRecords: number = 0;
  params: any;
  constructor(
    private service: KontrakService,
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
        'SortField': event.sortField ? event.sortField : '',
        'SortOrder': event.sortOrder ? event.sortOrder : 1,
        'Parameters.Idunit':this.userInfo.Idunit,
        'Parameters.Idkeg': 0,
        'Parameters.Idphk3': this.Idphk3 ? this.Idphk3 :0,
        'Parameters.NoKontrakExist': 'false'
        /*...this.params,*/
  
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
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'Error', detail: error.error.error[i]});
          }
        } else {
          this.msg.push({severity: 'error', summary: 'Error', detail: error.error});
        }
      });
    }

  pilih(e: IKontrak){
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
