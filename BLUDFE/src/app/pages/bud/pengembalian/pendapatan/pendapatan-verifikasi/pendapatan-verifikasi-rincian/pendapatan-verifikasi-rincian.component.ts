import { Component, Input, OnInit } from '@angular/core';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ISpm } from 'src/app/core/interface/ispm';
import { SpmdetdService } from 'src/app/core/services/spmdetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pendapatan-verifikasi-rincian',
  templateUrl: './pendapatan-verifikasi-rincian.component.html',
  styleUrls: ['./pendapatan-verifikasi-rincian.component.scss']
})
export class PendapatanVerifikasiRincianComponent implements OnInit {
  tabIndex: number = 0;
  @Input() sp2dSelected: ISp2d;
  @Input() spmSelected: ISpm;
  constructor(
    private service : SpmdetdService,
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