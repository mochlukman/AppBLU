import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { IBpkSpj } from 'src/app/core/interface/ibpk-spj';
import { ISpj } from 'src/app/core/interface/ispj';
import { BpkSpjService } from 'src/app/core/services/bpk-spj.service';

@Component({
  selector: 'app-lpj-pengajuan-rincian-spj',
  templateUrl: './lpj-pengajuan-rincian-spj.component.html',
  styleUrls: ['./lpj-pengajuan-rincian-spj.component.scss']
})
export class LpjPengajuanRincianSpjComponent implements OnInit {
  title: String;
  spjSelected: ISpj;
  showThis: boolean;
  msg: Message[];
  loading: boolean;
  listdata: IBpkSpj[] = [];
  constructor(
    private service : BpkSpjService,
  ) { }

  ngOnInit() {
  }
  get(){
    if(this.spjSelected){
      this.loading = true;
      this.listdata = [];
      this.service.gets('spj', this.spjSelected.idspj)
        .subscribe(resp => {
          if(resp.length > 0){
            this.listdata = [...resp];
          } else {
            this.msg.push({severity: 'info', summary: 'info', detail: 'Data Tidak Tersedia'});
          }
          this.loading = false;
        },(error) => {
          if(Array.isArray(error.error.error)){
            this.msg = [];
            for(var i = 0; i < error.error.error.length; i++){
              this.msg.push({severity: 'error', summary: 'error', detail: error.error.error[i]});
            }
          } else {
            this.msg = [];
            this.msg.push({severity: 'error', summary: 'error', detail: error.error});
          }
          this.loading = false;
        });
    }
  }
  onShow(){
    this.get();
  }
  onHide(){
    this.showThis = false;
    this.title = "";
    this.spjSelected = null;
    this.listdata = [];
  }
}
