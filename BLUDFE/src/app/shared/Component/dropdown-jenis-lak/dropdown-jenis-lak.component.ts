import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IfService } from 'src/app/core/services/if.service';

@Component({
  selector: 'app-dropdown-jenis-lak',
  templateUrl: './dropdown-jenis-lak.component.html',
  styleUrls: ['./dropdown-jenis-lak.component.scss']
})
export class DropdownJenisLakComponent implements OnInit, OnChanges {
  selectitem: SelectItem[] = [];
  listdata: any[] = [];
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
      Idjnslak : this.Ids
    };
    this.service.get(`Jnslak/byListId`, param)
      .subscribe(resp => {
        this.listdata = [];
        if(resp.length > 0 ){
          this.listdata = resp;
          this.listdata.forEach(e => {
            this.selectitem.push({label: `${e.uraijnslak.trim()}`, value: e.idjnslak})
          });
        }
      });
  }
  changedata(e: any){
    let data : any = this.listdata.find(f => f.idjnslak == e.value);
    this.callback.emit(data);
  }
}
