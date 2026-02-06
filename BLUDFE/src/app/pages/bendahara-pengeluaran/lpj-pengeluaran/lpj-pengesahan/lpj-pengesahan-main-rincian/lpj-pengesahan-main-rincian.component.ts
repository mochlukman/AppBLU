import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ILpj } from 'src/app/core/interface/ilpj';
import { LpjDetailService } from 'src/app/core/services/lpj-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-lpj-pengesahan-main-rincian',
  templateUrl: './lpj-pengesahan-main-rincian.component.html',
  styleUrls: ['./lpj-pengesahan-main-rincian.component.scss']
})
export class LpjPengesahanMainRincianComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  @Input() lpjSelected: ILpj;
  constructor(
    private service : LpjDetailService,
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
