import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-sp2b-rincian',
  templateUrl: './sp2b-rincian.component.html',
  styleUrls: ['./sp2b-rincian.component.scss']
})
export class Sp2bRincianComponent implements OnInit,OnChanges {
  @Input() rootSelected: any;

  constructor() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rootSelected;
  }
  ngOnInit() {
  }
}
