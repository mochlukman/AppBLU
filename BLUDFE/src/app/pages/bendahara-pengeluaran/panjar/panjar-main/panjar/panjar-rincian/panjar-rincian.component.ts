import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IPanjardet } from 'src/app/core/interface/ipanjardet';
import { PanjardetService } from 'src/app/core/services/panjardet.service';

@Component({
  selector: 'app-panjar-rincian',
  templateUrl: './panjar-rincian.component.html',
  styleUrls: ['./panjar-rincian.component.scss']
})
export class PanjarRincianComponent implements OnInit, OnDestroy {
  tabIndex: number = 0;
  @Input() panjarSelected: IPanjardet;
  constructor(
    private service: PanjardetService
  ) {
    
  }
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
