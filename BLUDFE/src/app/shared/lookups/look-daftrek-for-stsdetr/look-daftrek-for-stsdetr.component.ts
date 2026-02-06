import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftrekeningService } from 'src/app/core/services/daftrekening.service';

@Component({
  selector: 'app-look-daftrek-for-stsdetr',
  templateUrl: './look-daftrek-for-stsdetr.component.html',
  styleUrls: ['./look-daftrek-for-stsdetr.component.scss']
})
export class LookDaftrekForStsdetrComponent implements OnInit {
  private Idunit: number = 0;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idkeg: number = 0;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  private Idbend: number = 0;
  set _idbend(e : number){
    this.Idbend = e;
  }
  private Idxkode: number = 0;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  private Kdstatus: string = '';
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private KdperStartwith: string = '';
  set _kdperStartwith(e: string) {
    this.KdperStartwith = e;
  }
  private Mtglevel: string = '';
  set _mtglevel(e: string){
    this.Mtglevel = e;
  }
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
    this.service.getForStsdetr(this.Idunit, this.Idkeg, this.Idbend, this.Idxkode, this.Kdstatus, this.KdperStartwith, this.Mtglevel).subscribe(resp => {
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