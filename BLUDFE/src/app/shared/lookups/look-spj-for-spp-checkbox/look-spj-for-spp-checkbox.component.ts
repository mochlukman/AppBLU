import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Message} from 'primeng/api';
import {ISpjLookupForSpp} from 'src/app/core/interface/ispj';
import {SpjService} from 'src/app/core/services/spj.service';

@Component({
  selector: 'app-look-spj-for-spp-checkbox',
  templateUrl: './look-spj-for-spp-checkbox.component.html',
  styleUrls: ['./look-spj-for-spp-checkbox.component.scss']
})
export class LookSpjForSppCheckboxComponent implements OnInit {
  showThis: boolean;
  title: string;
  msgs: Message[];
  listdata: ISpjLookupForSpp[];
  loading: boolean;
  dataSelected: ISpjLookupForSpp[] = [];
  @Output() callBack = new EventEmitter();
  constructor(
    private service: SpjService
  ) {
  }

  ngOnInit() {
  }
  get(params: any) {
    this.listdata = [];
    this.msgs = [];
    this.loading = true;
    this.service.getLookupForSpp(params).subscribe((resp) => {
      if(resp.length > 0){
        this.listdata = resp;
      } else {
        this.msgs.push({ severity: 'info', summary: 'Info', detail: 'Data Tidak Tersedia' });
      }
      this.loading = false;
    },(error) => {
      this.loading = false;
      if(Array.isArray(error.error.error)){
        for(var i = 0; i < error.error.error; i++){
          this.msgs.push({severity: 'error', summary: 'Error', detail: error.error.error[i]});
        }
      } else {
        this.msgs.push({severity: 'error', summary: 'Error', detail: error.error});
      }
    });
  }
  pilih() {
    this.callBack.emit(this.dataSelected);
    this.onHide();
  }
  onHide(){
    this.msgs = [];
    this.showThis = false;
    this.dataSelected = [];
  }
}
