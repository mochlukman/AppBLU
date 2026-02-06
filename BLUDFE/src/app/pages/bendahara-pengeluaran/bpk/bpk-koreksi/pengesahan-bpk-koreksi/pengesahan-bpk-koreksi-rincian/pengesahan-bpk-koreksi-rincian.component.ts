import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IBpk } from 'src/app/core/interface/ibpk';

@Component({
  selector: 'app-pengesahan-bpk-koreksi-rincian',
  templateUrl: './pengesahan-bpk-koreksi-rincian.component.html',
  styleUrls: ['./pengesahan-bpk-koreksi-rincian.component.scss']
})
export class PengesahanBpkKoreksiRincianComponent implements OnInit, OnChanges, OnDestroy {
  @Input() bpkSelected: IBpk;
  tabIndex: number = 0;
  constructor() { }
  ngOnInit() {
    this.tabIndex = 0;
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  onChangeTab(e: any){
		this.tabIndex = e.index;
	}
  ngOnDestroy(): void {
    this.tabIndex = 0;
  }
}
