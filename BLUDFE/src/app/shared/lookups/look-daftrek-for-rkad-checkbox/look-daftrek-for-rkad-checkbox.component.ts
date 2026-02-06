import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { IDaftrekening } from 'src/app/core/interface/idaftrekening';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { DaftrekeningService } from 'src/app/core/services/daftrekening.service';

@Component({
  selector: 'app-look-daftrek-for-rkad-checkbox',
  templateUrl: './look-daftrek-for-rkad-checkbox.component.html',
  styleUrls: ['./look-daftrek-for-rkad-checkbox.component.scss']
})
export class LookDaftrekForRkadCheckboxComponent implements OnInit {
  private Idunit: number = 0;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Idjnsakun: number;
  set _idjnsakun(e: number){
    this.Idjnsakun = e;
  }
  private Kdtahap: string;
  set _kdtahap(e: string){
    this.Kdtahap = e;
  }
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IDaftrekening[] = [];
  dataSelected: IDaftrekening;
  userInfo: ITokenClaim;
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
    this.service._idjnsakun = this.Idjnsakun ? this.Idjnsakun.toString() : undefined;
    this.service._kdtahap = this.Kdtahap;
    this.service.getForRkad().subscribe(resp => {
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
  pilih(){
    this.callback.emit(this.dataSelected);
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
    this.dataSelected = null;
  }
}