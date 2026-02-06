import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ILpj } from 'src/app/core/interface/ilpj';
import { LpjDetailService } from 'src/app/core/services/lpj-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-lpj-pengajuan-main-rincian',
  templateUrl: './lpj-pengajuan-main-rincian.component.html',
  styleUrls: ['./lpj-pengajuan-main-rincian.component.scss']
})
export class LpjPengajuanMainRincianComponent implements OnInit, OnDestroy {
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

