import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-shared-ssh-detail',
  templateUrl: './shared-ssh-detail.component.html',
  styleUrls: ['./shared-ssh-detail.component.scss']
})
export class SharedSshDetailComponent implements OnInit, OnChanges, OnDestroy {
  @Input() sshselected: any;
  tabIndex: number = 0;
  constructor() { }
  ngOnInit() {
    this.tabIndex = 0;
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  onChangeTab(e: any){
		this.tabIndex = e.index;
	}
  ngOnDestroy(): void {
    this.tabIndex = 0;
  }
}