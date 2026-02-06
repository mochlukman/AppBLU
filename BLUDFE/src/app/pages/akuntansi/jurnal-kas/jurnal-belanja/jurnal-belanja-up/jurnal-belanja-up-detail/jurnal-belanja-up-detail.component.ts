import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ISpj } from 'src/app/core/interface/ispj';
import { SpjDetailService } from 'src/app/core/services/spj-detail.service';

@Component({
  selector: 'app-jurnal-belanja-up-detail',
  templateUrl: './jurnal-belanja-up-detail.component.html',
  styleUrls: ['./jurnal-belanja-up-detail.component.scss']
})
export class JurnalBelanjaUpDetailComponent implements OnInit, OnDestroy {
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
