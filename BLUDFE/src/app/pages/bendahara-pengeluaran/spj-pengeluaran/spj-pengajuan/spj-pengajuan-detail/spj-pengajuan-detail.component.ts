import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISpj } from 'src/app/core/interface/ispj';
import { BpkSpjService } from 'src/app/core/services/bpk-spj.service';
import { SpjDetailService } from 'src/app/core/services/spj-detail.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';

@Component({
  selector: 'app-spj-pengajuan-detail',
  templateUrl: './spj-pengajuan-detail.component.html',
  styleUrls: ['./spj-pengajuan-detail.component.scss']
})
export class SpjPengajuanDetailComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  @Input() spjSelected: ISpj;
  constructor(
    private service : SpjDetailService
  ) { }
  
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
