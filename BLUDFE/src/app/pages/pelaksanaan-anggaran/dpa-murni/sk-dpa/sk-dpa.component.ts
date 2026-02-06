import { Component, OnDestroy, OnInit } from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-sk-dpa',
  templateUrl: './sk-dpa.component.html',
  styleUrls: ['./sk-dpa.component.scss']
})
export class SkDpaComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.tabIndex = 0;
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
