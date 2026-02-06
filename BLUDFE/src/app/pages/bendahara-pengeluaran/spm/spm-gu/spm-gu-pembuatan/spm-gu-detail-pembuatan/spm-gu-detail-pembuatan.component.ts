import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-spm-gu-detail-pembuatan',
  templateUrl: './spm-gu-detail-pembuatan.component.html',
  styleUrls: ['./spm-gu-detail-pembuatan.component.scss']
})
export class SpmGuDetailPembuatanComponent implements OnInit, OnChanges, OnDestroy {
  tabIndex: number = 0;
  @Input() SpmSelected : ISpm;
  userInfo: ITokenClaim
  constructor(
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit() {
    this.tabIndex = 0;
  }
  onChangeTab(e: any){
		this.tabIndex = e.index;
	}
  ngOnDestroy(): void {
    this.tabIndex = 0;
    this.SpmSelected = null;
  }
}