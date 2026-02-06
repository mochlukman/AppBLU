import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IStrurek } from 'src/app/core/interface/istrurek';
import { StrurekService } from 'src/app/core/services/strurek.service';

@Component({
  selector: 'app-dropdown-strurek',
  templateUrl: './dropdown-strurek.component.html',
  styleUrls: ['./dropdown-strurek.component.scss']
})
export class DropdownStrurekComponent implements OnInit, OnChanges {
  selectitem: SelectItem[] = [];
  listdata: IStrurek[] = [];
  dataselected: any;
  @Output() callback = new EventEmitter();
  @Input() get: boolean;
  constructor(
    private service: StrurekService
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
    this.service.gets()
      .subscribe(resp => {
        this.listdata = [];
        if(resp.length > 0 ){
          this.listdata = resp;
          this.listdata.forEach(e => {
            this.selectitem.push({label: `${e.nmlevel.trim()}`, value: e.idstrurek})
          });
        }
      });
  }
  changedata(e: any){
    let data : IStrurek = this.listdata.find(f => f.idstrurek == e.value);
    this.callback.emit(data);
  }
}
