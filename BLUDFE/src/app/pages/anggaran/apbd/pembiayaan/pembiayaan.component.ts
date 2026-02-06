import { Component, OnInit } from '@angular/core';
import { RkabService } from 'src/app/core/services/rkab.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-pembiayaan',
  templateUrl: './pembiayaan.component.html',
  styleUrls: ['./pembiayaan.component.scss']
})
export class PembiayaanComponent implements OnInit {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private service: RkabService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
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
