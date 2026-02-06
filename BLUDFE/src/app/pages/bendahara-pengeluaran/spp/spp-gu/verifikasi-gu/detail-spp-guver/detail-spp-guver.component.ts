import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';

@Component({
  selector: 'app-detail-spp-guver',
  templateUrl: './detail-spp-guver.component.html',
  styleUrls: ['./detail-spp-guver.component.scss']
})
export class DetailSppGuverComponent implements OnInit, OnChanges, OnChanges {
  tabIndex: number = 0;
  @Input() SppSelected : ISpp;
  userInfo: ITokenClaim;
  constructor(
    private service: SppdetrService,
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
    this.SppSelected = null;
  }
}
