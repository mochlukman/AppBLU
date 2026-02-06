import { Component, OnDestroy, OnInit } from '@angular/core';
import { BkpajakService } from 'src/app/core/services/bkpajak.service';

@Component({
  selector: 'app-main-transfer',
  templateUrl: './main-transfer.component.html',
  styleUrls: ['./main-transfer.component.scss']
})
export class MainTransferComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  constructor(
    private service: BkpajakService
  ) {
    
  }
  ngOnInit() {
    this.service.setTabIndex(this.tabIndex);
  }
  onChangeTab(e: any){
		this.service.setTabIndex(e.index);
	}
  ngOnDestroy(): void{
    this.tabIndex = 0;
    this.service.setTabIndex(this.tabIndex);
  }
}
