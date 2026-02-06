import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftrekeningService } from 'src/app/core/services/daftrekening.service';

@Component({
  selector: 'app-look-daftrek-bydpa',
  templateUrl: './look-daftrek-bydpa.component.html',
  styleUrls: ['./look-daftrek-bydpa.component.scss']
})
export class LookDaftrekBydpaComponent implements OnInit {
  private Idunit: number = 0;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idkeg: number = 0;
  set _idkeg(e : number){
    this.Idkeg = e;
  }
  private KdperStartwith: string;
  set _kdperStartwith(e: string){
    this.KdperStartwith = e;
  }
  private Mtglevel: string;
  set _Mtglevel(e: string){
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
    this.service._idunit = this.Idunit;
    this.service._idkeg = this.Idkeg;
    this.service._Mtglevel = this.Mtglevel;
    this.service._kdperStartwith = this.KdperStartwith;
    this.service.getbyDpa().subscribe(resp => {
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
    this.Idunit = undefined;
    this.Idkeg = undefined;
    this.Mtglevel = undefined;
    this.KdperStartwith = undefined;
    this.listdata = [];
    this.msg = [];
    this.showThis = false;
  }
}