import { Component, Input, OnInit } from '@angular/core';
import { ISpm } from 'src/app/core/interface/ispm';
import { SpmdetdService } from 'src/app/core/services/spmdetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pendapatan-pengajuan-rincian',
  templateUrl: './pendapatan-pengajuan-rincian.component.html',
  styleUrls: ['./pendapatan-pengajuan-rincian.component.scss']
})
export class PendapatanPengajuanRincianComponent implements OnInit {
  tabIndex: number = 0;
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
