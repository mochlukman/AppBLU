import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { JurnalKonsolidatorService } from 'src/app/core/services/jurnal-konsolidator.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-jurnal-konsolidator-detail',
  templateUrl: './jurnal-konsolidator-detail.component.html',
  styleUrls: ['./jurnal-konsolidator-detail.component.scss']
})
export class JurnalKonsolidatorDetailComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  params: any;
  listdata: any[] = [];
  tabIndex: number = 0;
  constructor(
    private service: JurnalKonsolidatorService,
    private notif: NotifService
  ) { 
  }
  ngOnInit() {
  }
  gets(){
    if(this.params){
      this.loading = true;
      this.service.ayatAyat(this.params.jenis, this.params.nobukti, this.tabIndex + 1).subscribe(resp => {
        if(resp.length > 0){
          this.listdata = resp;
        }
        this.loading = false;
      }, (error) => {
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
  objectKeysToLowerCase = function (origObj) {
    return Object.keys(origObj).reduce(function (newObj, key) {
        let val = origObj[key];
        let newVal = (typeof val === 'object') ? this.objectKeysToLowerCase(val) : val;
        newObj[key.toLowerCase()] = newVal;
        return newObj;
    }, {});
  }
  onChangeTab(e: any){
    this.tabIndex = e.index;
    this.gets();
  }
  onShow(){
    this.gets();
  }
  onHide(){
    this.params = null;
    this.showThis = false;
    this.tabIndex = 0;
  }
}