import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pengajuan-detail',
  templateUrl: './pengajuan-detail.component.html',
  styleUrls: ['./pengajuan-detail.component.scss']
})
export class PengajuanDetailComponent implements OnInit, OnChanges {
  @Input() stsselected: any;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit() {
  }
}
