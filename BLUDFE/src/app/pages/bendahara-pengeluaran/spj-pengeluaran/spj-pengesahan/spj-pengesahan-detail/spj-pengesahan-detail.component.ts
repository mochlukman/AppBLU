import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISpj } from 'src/app/core/interface/ispj';

@Component({
  selector: 'app-spj-pengesahan-detail',
  templateUrl: './spj-pengesahan-detail.component.html',
  styleUrls: ['./spj-pengesahan-detail.component.scss']
})
export class SpjPengesahanDetailComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  @Input() spjSelected: ISpj;
  constructor(
  ) { }
  
  ngOnInit() {
    this.tabIndex = 0;
  }
  onChangeTab(e: any){
    this.tabIndex = e.index;
	}
  ngOnDestroy(): void{
    this.tabIndex = 0;
  }
}
