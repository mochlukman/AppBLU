import { Component, OnInit } from '@angular/core';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-belanja',
  templateUrl: './belanja.component.html',
  styleUrls: ['./belanja.component.scss']
})
export class BelanjaComponent implements OnInit {
  title: string = '';
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
  }

  ngOnInit() {
  }
}
