import { Component, OnInit } from '@angular/core';
import { Message } from 'primeng/api';
import { JurnalKasService } from 'src/app/core/services/jurnal-kas.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-jurnal-detail',
  templateUrl: './jurnal-detail.component.html',
  styleUrls: ['./jurnal-detail.component.scss']
})
export class JurnalDetailComponent implements OnInit {
  showThis: boolean;
  title: string;
  msg: Message[];
  loading: boolean;
  params: any;
  listdata: any[] = [];
  tabIndex: number = 0;
  constructor(
    private service: JurnalKasService,
    private notif: NotifService
  ) { 
  }

  ngOnInit() {
  }
  gets(){
    if(this.params){
      this.loading = true;
      this.service.ayatAyat(this.params.idunit, this.params.jenis, this.params.nobukti, this.tabIndex + 1).subscribe(resp => {
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

  
  subTotalD(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => {
        if(f.kdpers.trim() == 'D'){
          total += +f.nilai;
        }
      });
		}
		return total;
  }

  subTotalK(){
    let total = 0;
		if(this.listdata.length > 0){
			this.listdata.forEach(f => {
        if(f.kdpers.trim() == 'K'){
          total += +f.nilai;
        }
      });
		}
		return total;
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
