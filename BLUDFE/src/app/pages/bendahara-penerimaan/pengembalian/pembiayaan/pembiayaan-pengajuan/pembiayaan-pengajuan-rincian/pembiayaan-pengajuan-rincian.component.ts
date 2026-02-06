import { Component, Input, OnInit } from '@angular/core';
import { ISpm } from 'src/app/core/interface/ispm';
import { SpmdetbService } from 'src/app/core/services/spmdetb.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pembiayaan-pengajuan-rincian',
  templateUrl: './pembiayaan-pengajuan-rincian.component.html',
  styleUrls: ['./pembiayaan-pengajuan-rincian.component.scss']
})
export class PembiayaanPengajuanRincianComponent implements OnInit {
  tabIndex: number = 0;
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