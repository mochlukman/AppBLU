import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISpd } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpddetrService } from 'src/app/core/services/spddetr.service';

@Component({
  selector: 'app-spd-belanja-detail-pengesahan',
  templateUrl: './spd-belanja-detail-pengesahan.component.html',
  styleUrls: ['./spd-belanja-detail-pengesahan.component.scss']
})
export class SpdBelanjaDetailPengesahanComponent implements OnInit, OnChanges, OnDestroy {
  tabIndex: number = 0;
  @Input() SpdSelected : ISpd;
  userInfo: ITokenClaim;
  constructor(
    private service: SpddetrService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.SpdSelected;
  }
  ngOnInit() {
  }
  onChangeTab(e: any){
		this.service.setTabIndex(e.index);
	}
  ngOnDestroy(): void {
    this.tabIndex = 0;
    this.service.setTabIndex(0);
    this.SpdSelected = null;
  }
}
