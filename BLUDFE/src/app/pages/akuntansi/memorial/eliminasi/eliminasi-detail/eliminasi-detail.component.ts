import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-eliminasi-detail',
  templateUrl: './eliminasi-detail.component.html',
  styleUrls: ['./eliminasi-detail.component.scss']
})
export class EliminasiDetailComponent implements OnInit, OnChanges {
  @Input() BktmemSelected : any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
  }
}
