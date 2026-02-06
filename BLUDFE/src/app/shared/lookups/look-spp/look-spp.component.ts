/*import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Message } from 'primeng/api';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppService } from 'src/app/core/services/spp.service';

@Component({
  selector: 'app-look-spp',
  templateUrl: './look-spp.component.html',
  styleUrls: ['./look-spp.component.scss']
})
export class LookSppComponent implements OnInit {
  private Idunit: number;
  set _idunit(e: number){
    this.Idunit = e;
  }
  private Kdstatus: string;
  set _kdstatus(e: string){
    this.Kdstatus = e;
  }
  private Idxkode: number;
  set _idxkode(e: number){
    this.Idxkode = e;
  }
  showThis: boolean;
  title: string;
   params: any;
  msg: Message[];
  loading: boolean;
  listdata: ISpp[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: SppService,
    private auth: AuthenticationService
  ) {
    this.userInfo = this.auth.getTokenInfo();
  }
  ngOnInit() {
  }
  gets(){
    this.loading = true;
    this.service._idunit = this.Idunit;
    this.service._kdstatus = this.Kdstatus;
    this.service._idxkode = this.Idxkode;
    this.service.gets().subscribe(resp => {
      this.listdata = [];
      if(resp.length > 0){
        this.listdata = [...resp];
      } else {
        this.msg = [];
        this.msg.push({severity: 'info', summary: 'Informasi', detail: 'Data Tidak Tersedia'});
      }
      this.loading = false;
    }, (error) => {
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
  pilih(e: ISpp){
    this.callback.emit(e);
    this.onHide();
  }
  onHide(){
    this.dt.reset();
    this.title = '';
    this.listdata = [];
    this.showThis = false;
  }
}*/


import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {LazyLoadEvent, Message} from 'primeng/api';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppService } from 'src/app/core/services/spp.service';

@Component({
  selector: 'app-look-spp',
  templateUrl: './look-spp.component.html',
  styleUrls: ['./look-spp.component.scss']
})
export class LookSppComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: ISpp[] = [];
  userInfo: ITokenClaim;
  @ViewChild('dt', {static:false}) dt: any;
  @Output() callback = new EventEmitter();
  totalRecords: number = 0;
  params: any;
  constructor(
    private service: SppService,
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
  pilih(e: ISpp){
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
