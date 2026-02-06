import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISp2d } from 'src/app/core/interface/isp2d';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sp2d-gu-verifikasi-detail',
  templateUrl: './sp2d-gu-verifikasi-detail.component.html',
  styleUrls: ['./sp2d-gu-verifikasi-detail.component.scss']
})
export class Sp2dGuVerifikasiDetailComponent implements OnInit, OnChanges, OnDestroy {
  tabIndex: number = 0;
  @Input() sp2dSelected : ISp2d;
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
    this.sp2dSelected = null;
  }
}
