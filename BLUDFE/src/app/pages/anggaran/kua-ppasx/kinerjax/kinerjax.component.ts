import { Component, OnInit } from '@angular/core';
import { KinkegService } from 'src/app/core/services/kinkeg.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-kinerjax',
  templateUrl: './kinerjax.component.html',
  styleUrls: ['./kinerjax.component.scss']
})
export class KinerjaxComponent implements OnInit {
  tabIndex: number = 0;
  title: string = '';
  constructor(
    private service: KinkegService,
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
