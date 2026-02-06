import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-jurnal-memorial-detail',
  templateUrl: './jurnal-memorial-detail.component.html',
  styleUrls: ['./jurnal-memorial-detail.component.scss']
})
export class JurnalMemorialDetailComponent implements OnInit, OnChanges {
  @Input() BktmemSelected : any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
  }
}
