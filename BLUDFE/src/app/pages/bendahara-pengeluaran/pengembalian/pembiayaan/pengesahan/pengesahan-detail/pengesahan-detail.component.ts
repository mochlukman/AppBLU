import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pengesahan-detail',
  templateUrl: './pengesahan-detail.component.html',
  styleUrls: ['./pengesahan-detail.component.scss']
})
export class PengesahanDetailComponent implements OnInit, OnChanges {
  @Input() stsselected: any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
  }
}
