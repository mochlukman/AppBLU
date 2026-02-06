import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-surflus-detail',
  templateUrl: './surflus-detail.component.html',
  styleUrls: ['./surflus-detail.component.scss']
})
export class SurflusDetailComponent implements OnInit, OnChanges {
  @Input() BktmemSelected : any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
  }
}
