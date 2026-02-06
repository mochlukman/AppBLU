import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IfService } from 'src/app/core/services/if.service';

@Component({
  selector: 'app-search-unit',
  templateUrl: './search-unit.component.html',
  styleUrls: ['./search-unit.component.scss']
})
export class SearchUnitComponent implements OnInit, OnChanges {
  data: IDaftunit;
  listData: IDaftunit[] = [];
	selectedData: IDaftunit;
  @Input() Kdlevel: string;
  @Output() callback = new EventEmitter();
  constructor(
    private service: IfService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  searchData(k: any){
    const param = {
      Level : this.Kdlevel,
      Keyword: k.query
    };
		this.service.get(`Daftunit/Search`, param).subscribe(resp => {
			this.listData = Object.assign(resp);
      this.listData.map(m => {
        m.combine = m.kdunit + ' - ' + m.nmunit
      });
			let unitQuery = this.listData.find(x => x.nmunit === k.query || x.kdunit === k.query);
			if(unitQuery){
        this.selectedData = unitQuery;
        this.assignData(this.selectedData);
			} else {
        this.assignData(null);
      }
		});
	}
	onSelectData(s: any) {
    this.selectedData = s;
    this.assignData(this.selectedData);
	}
	onClearData(c: any) {
		if (c.isTrusted) {
      this.selectedData = null;
      this.assignData(null);
		}
  }
  assignData(data: IDaftunit){
    this.callback.emit(data);
  }
}
