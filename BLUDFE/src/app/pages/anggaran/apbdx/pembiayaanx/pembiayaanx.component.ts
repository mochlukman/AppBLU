import { Component, OnInit } from '@angular/core';
import { RkabService } from 'src/app/core/services/rkab.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-pembiayaanx',
  templateUrl: './pembiayaanx.component.html',
  styleUrls: ['./pembiayaanx.component.scss']
})
export class PembiayaanxComponent implements OnInit {
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

