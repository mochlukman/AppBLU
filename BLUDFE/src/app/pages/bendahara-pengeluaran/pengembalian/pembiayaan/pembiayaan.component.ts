import { Component, OnInit } from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-pembiayaan',
  templateUrl: './pembiayaan.component.html',
  styleUrls: ['./pembiayaan.component.scss']
})
export class PembiayaanComponent implements OnInit {
  title: string = '';
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }

  ngOnInit() {
  }
}
