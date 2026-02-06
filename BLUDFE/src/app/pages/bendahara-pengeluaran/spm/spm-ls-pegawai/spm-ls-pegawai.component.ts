import { Component, OnDestroy, OnInit } from '@angular/core';
import { SpmService } from 'src/app/core/services/spm.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-spm-ls-pegawai',
  templateUrl: './spm-ls-pegawai.component.html',
  styleUrls: ['./spm-ls-pegawai.component.scss']
})
export class SpmLsPegawaiComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
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
