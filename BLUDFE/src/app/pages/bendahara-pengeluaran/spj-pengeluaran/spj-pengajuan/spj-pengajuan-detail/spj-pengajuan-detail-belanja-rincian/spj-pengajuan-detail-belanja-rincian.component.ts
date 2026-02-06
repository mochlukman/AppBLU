import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, Message } from 'primeng/api';
import { IBpk } from 'src/app/core/interface/ibpk';
import { IBpkdetr } from 'src/app/core/interface/ibpkdetr';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { BpkdetrService } from 'src/app/core/services/bpkdetr.service';

@Component({
  selector: 'app-spj-pengajuan-detail-belanja-rincian',
  templateUrl: './spj-pengajuan-detail-belanja-rincian.component.html',
  styleUrls: ['./spj-pengajuan-detail-belanja-rincian.component.scss']
})
export class SpjPengajuanDetailBelanjaRincianComponent implements OnInit {
  BpkSelected: IBpk;
  title: String;
  showThis: boolean;
  msg: Message[];
  loading: boolean;
  listdata: IBpkdetr[] = [];
  totalRecords: number = 0;
  userInfo: ITokenClaim;
  @ViewChild('dt',{static:false}) dt: any;
  dataSelected: IBpkdetr;
  constructor(
    private service: BpkdetrService,
  ) { }

  ngOnInit() {
  }
  get(event: LazyLoadEvent){
    if(this.BpkSelected){
      if(this.loading) this.loading = true;
      this.listdata = [];
      this.service._start = event.first;
      this.service._rows = event.rows;
      this.service._globalFilter = event.globalFilter;
      this.service._sortField = event.sortField;
      this.service._sortOrder = event.sortOrder;
      this.service._idbpk = this.BpkSelected.idbpk;
      this.service._idkeg = this.BpkSelected.idkeg;
      this.service.paging().subscribe(resp => {
        if (resp.totalrecords > 0) {
          this.totalRecords = resp.totalrecords;
          this.listdata = resp.data;
        } else {
          this.msg = [];
          this.msg.push({severity: 'info', summary: 'info', detail: 'Data Tidak Tersedia'});
        }
        this.loading = false;
      }, error => {
        this.loading = false;
        if(Array.isArray(error.error.error)){
          this.msg = [];
          for(var i = 0; i < error.error.error.length; i++){
            this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
          }
        } else {
          this.msg = [];
          this.msg.push({severity: 'error', summary: 'error', detail: error.error});
        }
      });
    }
  }
  onShow(event: LazyLoadEvent){
    this.get(event);
  }
  onHide(){
    this.BpkSelected = null;
    this.showThis = false;
    this.title = "";
    this.dataSelected = null;
    this.listdata = [];
    this.msg = [];
  }
}
