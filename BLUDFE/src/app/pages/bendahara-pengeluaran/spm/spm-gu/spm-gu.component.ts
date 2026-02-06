import { Component, OnDestroy, OnInit } from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-spm-gu',
  templateUrl: './spm-gu.component.html',
  styleUrls: ['./spm-gu.component.scss']
})
export class SpmGuComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }
  ngOnInit() {
    this.tabIndex = 0
  }
  onChangeTab(e: any){
		this.tabIndex = e.index;
	}
  ngOnDestroy(): void{
    this.tabIndex = 0;
  }
}
