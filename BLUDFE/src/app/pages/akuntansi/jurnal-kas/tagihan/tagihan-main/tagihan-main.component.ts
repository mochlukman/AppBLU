import {Component, OnDestroy, OnInit} from '@angular/core';
import {TagihanService} from 'src/app/core/services/tagihan.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-tagihan-main',
  templateUrl: './tagihan-main.component.html',
  styleUrls: ['./tagihan-main.component.scss']
})
export class TagihanMainComponent implements OnInit,  OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private service: TagihanService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }
  ngOnInit() {
    this.service.setTabIndex(this.tabIndex);
  }
  onChangeTab(e: any){
    this.service.setTabIndex(e.index);
    this.service.setTagihanSelected(null);
  }
  ngOnDestroy(): void{
    this.tabIndex = 0;
    this.service.setTabIndex(this.tabIndex);
    this.service.setTagihanSelected(null);
  }
}
