import { Component, OnInit } from '@angular/core';
import { LpjMainService } from 'src/app/core/services/lpj-main.service';

@Component({
  selector: 'app-lpj-main-page',
  templateUrl: './lpj-main-page.component.html',
  styleUrls: ['./lpj-main-page.component.scss']
})
export class LpjMainPageComponent implements OnInit {
  tabIndex: number = 0;
  constructor(
    private service: LpjMainService
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