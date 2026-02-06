import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISts } from 'src/app/core/interface/ists';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetdService } from 'src/app/core/services/stsdetd.service';

@Component({
  selector: 'app-sts-pengajuan-main-rincian',
  templateUrl: './sts-pengajuan-main-rincian.component.html',
  styleUrls: ['./sts-pengajuan-main-rincian.component.scss']
})
export class StsPengajuanMainRincianComponent implements OnInit, OnChanges, OnDestroy {
  tabIndex: number = 0;
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  constructor(
    private service: StsdetdService,
    private authService: AuthenticationService
  ) {
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.StsSelected){

    }
  }
  ngOnInit() {
  }
  onChangeTab(e: any){
		this.service.setTabIndex(e.index);
	}
  ngOnDestroy(): void {
    this.tabIndex = 0;
    this.service.setTabIndex(0);
    this.StsSelected = null;
  }
}
