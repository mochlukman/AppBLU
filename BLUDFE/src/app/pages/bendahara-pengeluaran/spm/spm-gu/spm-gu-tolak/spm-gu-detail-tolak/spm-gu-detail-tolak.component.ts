import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-spm-gu-detail-tolak',
  templateUrl: './spm-gu-detail-tolak.component.html',
  styleUrls: ['./spm-gu-detail-tolak.component.scss']
})
export class SpmGuDetailTolakComponent implements OnInit, OnChanges, OnDestroy {
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
