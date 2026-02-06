import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IBulan } from 'src/app/core/interface/ibulan';
import { BulanService } from 'src/app/core/services/bulan.service';

@Component({
  selector: 'app-dropdown-bulan',
  templateUrl: './dropdown-bulan.component.html',
  styleUrls: ['./dropdown-bulan.component.scss']
})
export class DropdownBulanComponent implements OnInit, OnChanges {
  selectitem: SelectItem[] = [];
  listdata: IBulan[] = [];
  dataselected: any;
  @Output() callback = new EventEmitter();
  @Input() get: boolean;
  constructor(
    private service: BulanService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.get && changes.get.currentValue){
      this.gets();
    }
  }

  ngOnInit() {
    this.gets();
  }
  gets(){
    this.selectitem = [
      {label: 'Pilih', value: null}
    ];
    this.service.gets()
      .subscribe(resp => {
        this.listdata = [];
        if(resp.length > 0 ){
          this.listdata = resp;
          this.listdata.forEach(e => {
            this.selectitem.push({label: `${e.ketBulan.trim()}`, value: e.idbulan})
          });
        }
      });
  }
  changedata(e: any){
    let data : IBulan = this.listdata.find(f => f.idbulan == e.value);
    this.callback.emit(data);
  }
}
