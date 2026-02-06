import { Component, OnDestroy, OnInit } from '@angular/core';
import { BkpajakService } from 'src/app/core/services/bkpajak.service';

@Component({
  selector: 'app-main-tunai',
  templateUrl: './main-tunai.component.html',
  styleUrls: ['./main-tunai.component.scss']
})
export class MainTunaiComponent implements OnInit, OnDestroy {
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

