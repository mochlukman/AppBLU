import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { IfService } from 'src/app/core/services/if.service';

@Component({
  selector: 'app-dropdown-jenis-bukti-memorial',
  templateUrl: './dropdown-jenis-bukti-memorial.component.html',
  styleUrls: ['./dropdown-jenis-bukti-memorial.component.scss']
})
export class DropdownJenisBuktiMemorialComponent implements OnInit, OnChanges {
  selectitem: SelectItem[] = [];
  listdata: any[] = [];
  dataselected: any;
  @Output() callback = new EventEmitter();
  @Input() get: boolean;
  @Input() kode: string;
  constructor(
    private service: IfService
  ) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(!changes.get.firstChange && changes.get.currentValue){
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
      Kdbm : this.kode
    };
    this.service.get(`Jbm/bykode`, param)
      .subscribe(resp => {
        this.listdata = [];
        if(resp.length > 0 ){
          this.listdata = resp;
          this.listdata.forEach(e => {
            this.selectitem.push({label: `${e.kdbm.trim()} - ${e.nmbm.trim()}`, value: e.idjbm})
          });
        }
      });
  }
  changedata(e: any){
    let data : any = this.listdata.find(f => f.idjbm == e.value);
    this.callback.emit(data);
  }
}
