import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { IBkpajak } from 'src/app/core/interface/ibkpajak';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { BkpajakdetstrService } from 'src/app/core/services/bkpajakdetstr.service';

@Component({
  selector: 'app-tab-pajak-transfer-detail',
  templateUrl: './tab-pajak-transfer-detail.component.html',
  styleUrls: ['./tab-pajak-transfer-detail.component.scss']
})
export class TabPajakTransferDetailComponent implements OnInit, OnDestroy, OnChanges {
  tabIndex: number = 0;
  @Input() bkpajakSeleted : IBkpajak;
  userInfo: ITokenClaim
  constructor(
    private service: BkpajakdetstrService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  ngOnInit() {
  }
  onChangeTab(e: any){
		this.service.setTabIndex(e.index);
	}
  ngOnDestroy(): void {
    this.tabIndex = 0;
    this.service.setTabIndex(0);
    this.bkpajakSeleted = null;
  }
}

