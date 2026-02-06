import {Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';
import {SpjapbdService} from 'src/app/core/services/spjapbd.service';

@Component({
  selector: 'app-realisasi-apbd',
  templateUrl: './realisasi-apbd.component.html',
  styleUrls: ['./realisasi-apbd.component.scss']
})
export class RealisasiApbdComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private service: SpjapbdService,
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }
  ngOnInit() {
  }
  onChangeTab(e: any){
    this.tabIndex = e.index;
  }
  ngOnDestroy(): void{
    this.tabIndex = 0;
  }
}
