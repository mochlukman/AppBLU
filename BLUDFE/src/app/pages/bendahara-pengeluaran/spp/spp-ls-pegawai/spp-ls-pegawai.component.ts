import { Component, OnDestroy, OnInit } from '@angular/core';
import { SppService } from 'src/app/core/services/spp.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-spp-ls-pegawai',
  templateUrl: './spp-ls-pegawai.component.html',
  styleUrls: ['./spp-ls-pegawai.component.scss']
})
export class SppLsPegawaiComponent implements OnInit, OnDestroy {
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
