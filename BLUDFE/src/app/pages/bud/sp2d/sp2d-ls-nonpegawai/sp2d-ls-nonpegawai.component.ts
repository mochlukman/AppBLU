import { Component, OnDestroy, OnInit } from '@angular/core';
import { Sp2dService } from 'src/app/core/services/sp2d.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-sp2d-ls-nonpegawai',
  templateUrl: './sp2d-ls-nonpegawai.component.html',
  styleUrls: ['./sp2d-ls-nonpegawai.component.scss']
})
export class Sp2dLsNonpegawaiComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
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
