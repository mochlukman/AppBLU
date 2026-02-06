import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-bukti-memorial-detail',
  templateUrl: './bukti-memorial-detail.component.html',
  styleUrls: ['./bukti-memorial-detail.component.scss']
})
export class BuktiMemorialDetailComponent implements OnInit, OnChanges {
  @Input() BktmemSelected : any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
  }
}
