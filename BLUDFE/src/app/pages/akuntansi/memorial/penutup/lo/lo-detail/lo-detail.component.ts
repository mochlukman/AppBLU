import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-lo-detail',
  templateUrl: './lo-detail.component.html',
  styleUrls: ['./lo-detail.component.scss']
})
export class LoDetailComponent implements OnInit, OnChanges {
  @Input() BktmemSelected : any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
  }
}
