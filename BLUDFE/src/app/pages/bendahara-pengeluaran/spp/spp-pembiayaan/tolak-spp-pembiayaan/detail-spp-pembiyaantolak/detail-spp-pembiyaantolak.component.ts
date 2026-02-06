import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-detail-spp-pembiyaantolak',
  templateUrl: './detail-spp-pembiyaantolak.component.html',
  styleUrls: ['./detail-spp-pembiyaantolak.component.scss']
})
export class DetailSppPembiyaantolakComponent implements OnInit, OnChanges, OnDestroy {
  tabIndex: number = 0;
  @Input() SppSelected : ISpp;
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
    this.SppSelected = null;
  }
}

