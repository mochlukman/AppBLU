import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sp2b-sah-rincian',
  templateUrl: './sp2b-sah-rincian.component.html',
  styleUrls: ['./sp2b-sah-rincian.component.scss']
})
export class Sp2bSahRincianComponent implements OnInit, OnChanges {
  @Input() rootSelected: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rootSelected;
  }
  ngOnInit() {
  }
}
