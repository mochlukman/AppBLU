import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IJnsakun } from 'src/app/core/interface/ijnsakun';
import { IfService } from 'src/app/core/services/if.service';
import { JnsakunService } from 'src/app/core/services/jnsakun.service';

@Component({
  selector: 'app-dropdown-jenis-akun',
  templateUrl: './dropdown-jenis-akun.component.html',
  styleUrls: ['./dropdown-jenis-akun.component.scss']
})
export class DropdownJenisAkunComponent implements OnInit, OnChanges {
  selectitem: SelectItem[] = [];
  listdata: IJnsakun[] = [];
  dataselected: any;
  @Output() callback = new EventEmitter();
  @Input() get: boolean;
  @Input() Ids: string
  constructor(
    private service: IfService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.get && changes.get.currentValue){
      this.gets();
    }
  }

  ngOnInit() {
  }
  gets(){
    this.selectitem = [
      {label: 'Pilih', value: null}
    ];
    const param = {
      Idjnsakun: this.Ids
    }
    this.service.get(`Jnsakun/byListId`, param)
      .subscribe(resp => {
        this.listdata = [];
        if(resp.length > 0 ){
          this.listdata = resp;
          this.listdata.forEach(e => {
            this.selectitem.push({label: `${e.uraiakun.trim()}`, value: e.idjnsakun})
          });
        }
      });
  }
  changedata(e: any){
    let data : IJnsakun = this.listdata.find(f => f.idjnsakun == e.value);
    this.callback.emit(data);
  }
}
