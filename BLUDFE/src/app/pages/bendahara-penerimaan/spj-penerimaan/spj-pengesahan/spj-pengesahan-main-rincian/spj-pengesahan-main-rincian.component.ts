import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISpjtr } from 'src/app/core/interface/ispjtr';
import { SpjtrDetailService } from 'src/app/core/services/spjtr-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-spj-pengesahan-main-rincian',
  templateUrl: './spj-pengesahan-main-rincian.component.html',
  styleUrls: ['./spj-pengesahan-main-rincian.component.scss']
})
export class SpjPengesahanMainRincianComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  @Input() spjtrSelected: ISpjtr;
  constructor(
    private service : SpjtrDetailService,
    private notif: NotifService
  ) { }

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
