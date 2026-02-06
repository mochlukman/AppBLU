import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-pergeseran',
  templateUrl: './pergeseran.component.html',
  styleUrls: ['./pergeseran.component.scss']
})
export class PergeseranComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }
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
