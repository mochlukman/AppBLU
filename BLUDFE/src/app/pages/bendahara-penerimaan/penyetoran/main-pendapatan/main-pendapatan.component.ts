import { Component, OnDestroy, OnInit } from '@angular/core';
import { StsService } from 'src/app/core/services/sts.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-main-pendapatan',
  templateUrl: './main-pendapatan.component.html',
  styleUrls: ['./main-pendapatan.component.scss']
})
export class MainPendapatanComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private service: StsService,
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
