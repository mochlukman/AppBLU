import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISts } from 'src/app/core/interface/ists';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { StsdetbService } from 'src/app/core/services/stsdetb.service';

@Component({
  selector: 'app-bpengajuan-main-rincian',
  templateUrl: './bpengajuan-main-rincian.component.html',
  styleUrls: ['./bpengajuan-main-rincian.component.scss']
})
export class BPengajuanMainRincianComponent implements OnInit, OnDestroy, OnChanges {
  tabIndex: number = 0;
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  constructor(
    private service: StsdetbService,
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