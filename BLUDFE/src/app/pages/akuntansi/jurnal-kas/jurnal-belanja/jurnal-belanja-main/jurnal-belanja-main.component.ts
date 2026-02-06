import { Component, OnDestroy, OnInit } from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-jurnal-belanja-main',
  templateUrl: './jurnal-belanja-main.component.html',
  styleUrls: ['./jurnal-belanja-main.component.scss']
})
export class JurnalBelanjaMainComponent implements OnInit, OnDestroy {
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
