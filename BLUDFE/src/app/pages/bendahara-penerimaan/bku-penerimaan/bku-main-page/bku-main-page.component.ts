import { Component, OnInit } from '@angular/core';
import { BkuPenerimaanMainPageService } from 'src/app/core/services/bku-penerimaan-main-page.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-bku-main-page',
  templateUrl: './bku-main-page.component.html',
  styleUrls: ['./bku-main-page.component.scss']
})
export class BkuMainPageComponent implements OnInit {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private service: BkuPenerimaanMainPageService,
    private global: GlobalService
  ) {
    this.global._title.subscribe((s) => this.title = s);
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
