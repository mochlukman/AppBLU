import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { IMkegiatan } from 'src/app/core/interface/imkegiatan';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { MkegiatanService } from 'src/app/core/services/mkegiatan.service';

@Component({
  selector: 'app-look-mkegiatan',
  templateUrl: './look-mkegiatan.component.html',
  styleUrls: ['./look-mkegiatan.component.scss']
})
export class LookMkegiatanComponent implements OnInit {
  private Idkeg: number;
  set _idkeg(e: number){
    this.Idkeg = e;
  }
  private Idprgrm: number;
  set _idprgrm(e: number){
    this.Idprgrm = e;
  }
  private Kdperspektif: number;
  set _kdperspektif(e: number){
    this.Kdperspektif = e;
  }
  private Levelkeg: number;
  set _levelkeg(e: number){
    this.Levelkeg = e;
  }
  private Type: string;
  set _type(e: string){
    this.Type = e;
  }
  private Idkeginduk: number;
  set _idkeginduk(e: number){
    this.Idkeginduk = e;
  }
  private Jnskeg: number;
  set _jnskeg(e: number){
    this.Jnskeg = e;
  }
  private Idpgrmunit:number;
  set _idpgrmunit(e: number){ // ini diisi kalau lookup yang diingikan != kegiatan yang ada di kegunit / untuk input ke kegunit
    this.Idpgrmunit = e;
  }
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  listdata: IMkegiatan[] = [];
  userInfo: ITokenClaim;
  totalRecords: number;
  @ViewChild('dt', {static:true}) dt: any;
  @Output() callback = new EventEmitter();
  constructor(
    private service: MkegiatanService,
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
    this.service._idkeg = this.Idkeg;
    this.service._idprgrm = this.Idprgrm;
    this.service._kdperspektif = this.Kdperspektif;
    this.service._levelkeg = this.Levelkeg;
    this.service._type = this.Type;
    this.service._idkeginduk = this.Idkeginduk;
    this.service._jnskeg = this.Jnskeg;
    this.service._idpgrmunit = this.Idpgrmunit;
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
  pilih(e: IMkegiatan){
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