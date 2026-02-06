import { Component, Input, OnInit } from '@angular/core';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ISpm } from 'src/app/core/interface/ispm';
import { SpmdetbService } from 'src/app/core/services/spmdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pembiayaan-pembuatan-rincian',
  templateUrl: './pembiayaan-pembuatan-rincian.component.html',
  styleUrls: ['./pembiayaan-pembuatan-rincian.component.scss']
})
export class PembiayaanPembuatanRincianComponent implements OnInit {
  tabIndex: number = 0;
  @Input() sp2dSelected: ISp2d;
  @Input() spmSelected: ISpm;
  constructor(
    private service : SpmdetbService,
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