import { Component, OnDestroy, OnInit } from '@angular/core';
import { SppService } from 'src/app/core/services/spp.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-spp-tu',
  templateUrl: './spp-tu.component.html',
  styleUrls: ['./spp-tu.component.scss']
})
export class SppTuComponent implements OnInit, OnDestroy {
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

