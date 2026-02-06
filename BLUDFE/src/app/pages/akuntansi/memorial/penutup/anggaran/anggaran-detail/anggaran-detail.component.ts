import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-anggaran-detail',
  templateUrl: './anggaran-detail.component.html',
  styleUrls: ['./anggaran-detail.component.scss']
})
export class AnggaranDetailComponent implements OnInit, OnChanges {
  @Input() BktmemSelected : any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
  }
}
