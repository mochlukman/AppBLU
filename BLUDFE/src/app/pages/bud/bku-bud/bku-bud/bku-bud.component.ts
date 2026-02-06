import { Component, OnDestroy, OnInit } from '@angular/core';
import { BkuBudService } from 'src/app/core/services/bku-bud.service';

@Component({
  selector: 'app-bku-bud',
  templateUrl: './bku-bud.component.html',
  styleUrls: ['./bku-bud.component.scss']
})
export class BkuBudComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  constructor(
    private service: BkuBudService
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
