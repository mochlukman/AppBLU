import { Component, OnDestroy, OnInit } from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-jurnal-kas-main',
  templateUrl: './jurnal-kas-main.component.html',
  styleUrls: ['./jurnal-kas-main.component.scss']
})
export class JurnalKasMainComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }
  ngOnInit() {
  }
  ngOnDestroy(): void{
    this.tabIndex = 0;
  }
}
