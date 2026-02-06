import { Component, OnDestroy, OnInit } from '@angular/core';
import { SkpService } from 'src/app/core/services/skp.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-main-skp',
  templateUrl: './main-skp.component.html',
  styleUrls: ['./main-skp.component.scss']
})
export class MainSkpComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private service: SkpService,
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
