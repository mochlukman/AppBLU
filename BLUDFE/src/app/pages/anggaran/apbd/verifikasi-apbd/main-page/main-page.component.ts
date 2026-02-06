import { Component, OnInit } from '@angular/core';
import { RkaMainService } from 'src/app/core/services/rka-main.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private service: RkaMainService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
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
