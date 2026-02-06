import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-spm-tu-detailver',
  templateUrl: './spm-tu-detailver.component.html',
  styleUrls: ['./spm-tu-detailver.component.scss']
})
export class SpmTuDetailverComponent implements OnInit, OnChanges, OnDestroy {
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
