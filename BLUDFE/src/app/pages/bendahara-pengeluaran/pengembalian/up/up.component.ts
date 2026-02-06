import { Component, OnInit } from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-up',
  templateUrl: './up.component.html',
  styleUrls: ['./up.component.scss']
})
export class UpComponent implements OnInit {
  title: string = '';
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }

  ngOnInit() {
  }

}
