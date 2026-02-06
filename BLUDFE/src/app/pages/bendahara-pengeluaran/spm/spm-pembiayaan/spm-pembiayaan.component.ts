import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpmService } from 'src/app/core/services/spm.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-spm-pembiayaan',
  templateUrl: './spm-pembiayaan.component.html',
  styleUrls: ['./spm-pembiayaan.component.scss']
})
export class SpmPembiayaanComponent implements OnInit, OnDestroy {
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
