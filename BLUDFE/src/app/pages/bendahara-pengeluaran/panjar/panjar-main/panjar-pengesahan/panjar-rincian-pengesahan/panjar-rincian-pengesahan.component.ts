import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {IPanjardet} from 'src/app/core/interface/ipanjardet';
import {PanjardetService} from 'src/app/core/services/panjardet.service';

@Component({
  selector: 'app-panjar-rincian-pengesahan',
  templateUrl: './panjar-rincian-pengesahan.component.html',
  styleUrls: ['./panjar-rincian-pengesahan.component.scss']
})
export class PanjarRincianPengesahanComponent implements OnInit, OnDestroy {
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
