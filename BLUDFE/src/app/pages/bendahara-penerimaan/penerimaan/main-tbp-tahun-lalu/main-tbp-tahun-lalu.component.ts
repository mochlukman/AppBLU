import {Component, OnDestroy, OnInit} from '@angular/core';
import {TbpService} from 'src/app/core/services/tbp.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-main-tbp-tahun-lalu',
  templateUrl: './main-tbp-tahun-lalu.component.html',
  styleUrls: ['./main-tbp-tahun-lalu.component.scss']
})
export class MainTbpTahunLaluComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private service: TbpService,
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

