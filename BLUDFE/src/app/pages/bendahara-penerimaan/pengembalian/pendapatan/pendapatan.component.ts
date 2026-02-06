import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpmService } from 'src/app/core/services/spm.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-pendapatan',
  templateUrl: './pendapatan.component.html',
  styleUrls: ['./pendapatan.component.scss']
})
export class PendapatanComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private service: SpmService,
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
