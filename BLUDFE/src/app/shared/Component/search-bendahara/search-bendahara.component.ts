import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Ibend } from 'src/app/core/interface/ibend';
import { IfService } from 'src/app/core/services/if.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-search-bendahara',
  templateUrl: './search-bendahara.component.html',
  styleUrls: ['./search-bendahara.component.scss']
})
export class SearchBendaharaComponent implements OnInit, OnChanges {
  data: Ibend;
  listData: Ibend[] = [];
	selectedData: Ibend;
  @Input() Idunit: number;
  @Input() Jndbend: string;
  @Output() callback = new EventEmitter();
  constructor(
    private service: IfService,
    private notif: NotifService
  ) { }

  ngOnInit() {
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  searchData(k: any){
    if(this.Idunit < 1){
      this.notif.warning('Unit Organisasi Harus Dipilih');
    } else {
      const param = {
        Idunit: this.Idunit,
        Jnsbend: this.Jndbend,
        Keyword: k.query
      };
      this.service.get(`Bend/search`, param).subscribe(resp => {
        this.listData = Object.assign(resp);
        this.listData.map(m => {
          m.combine = m.idpegNavigation.nip.trim() + ' - ' + m.idpegNavigation.nama.trim()
        });
        let unitQuery = this.listData.find(x => x.idpegNavigation.nip === k.query || x.idpegNavigation.nama === k.query);
        if(unitQuery){
          this.selectedData = unitQuery;
          this.assignData(this.selectedData);
        } else {
          this.assignData(null);
        }
      });
    }
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
  assignData(data: Ibend){
    this.callback.emit(data);
  }
}
