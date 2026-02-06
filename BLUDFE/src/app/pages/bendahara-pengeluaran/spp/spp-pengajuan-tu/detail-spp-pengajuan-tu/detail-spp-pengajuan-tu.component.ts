import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';

@Component({
  selector: 'app-detail-spp-pengajuan-tu',
  templateUrl: './detail-spp-pengajuan-tu.component.html',
  styleUrls: ['./detail-spp-pengajuan-tu.component.scss']
})
export class DetailSppPengajuanTuComponent implements OnInit, OnDestroy, OnChanges {
  tabIndex: number = 0;
  @Input() SppSelected : ISpp;
  userInfo: ITokenClaim
  constructor(
    private service: SppdetrService,
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
