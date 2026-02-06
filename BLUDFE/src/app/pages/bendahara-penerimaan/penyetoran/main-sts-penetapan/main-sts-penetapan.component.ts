import {Component, OnDestroy, OnInit} from '@angular/core';
import {StsService} from 'src/app/core/services/sts.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-main-sts-penetapan',
  templateUrl: './main-sts-penetapan.component.html',
  styleUrls: ['./main-sts-penetapan.component.scss']
})
export class MainStsPenetapanComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private service: StsService,
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
