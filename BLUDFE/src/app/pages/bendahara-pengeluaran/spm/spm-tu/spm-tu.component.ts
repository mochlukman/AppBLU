import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpmService } from 'src/app/core/services/spm.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-spm-tu',
  templateUrl: './spm-tu.component.html',
  styleUrls: ['./spm-tu.component.scss']
})
export class SpmTuComponent implements OnInit, OnDestroy {
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
