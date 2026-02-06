import { Component, Input, OnInit } from '@angular/core';
import { ISpm } from 'src/app/core/interface/ispm';
import { SpmdetdService } from 'src/app/core/services/spmdetd.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-pendapatan-pengesahan-rincian',
  templateUrl: './pendapatan-pengesahan-rincian.component.html',
  styleUrls: ['./pendapatan-pengesahan-rincian.component.scss']
})
export class PendapatanPengesahanRincianComponent implements OnInit {
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