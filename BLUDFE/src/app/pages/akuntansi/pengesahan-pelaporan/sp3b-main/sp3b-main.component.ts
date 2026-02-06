import {Component, OnDestroy, OnInit} from '@angular/core';
import {SpjapbdService} from 'src/app/core/services/spjapbd.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-sp3b-main',
  templateUrl: './sp3b-main.component.html',
  styleUrls: ['./sp3b-main.component.scss']
})
export class Sp3bMainComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private service: SpjapbdService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }
  ngOnInit() {
  }
  onChangeTab(e: any){
    this.tabIndex = e.index;
  }
  ngOnDestroy(): void{
    this.tabIndex = 0;
  }
}
