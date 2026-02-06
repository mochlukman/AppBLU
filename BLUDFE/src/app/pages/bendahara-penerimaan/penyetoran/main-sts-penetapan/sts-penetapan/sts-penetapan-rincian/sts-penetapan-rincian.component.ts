import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ISts} from 'src/app/core/interface/ists';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {StsdetdService} from 'src/app/core/services/stsdetd.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sts-penetapan-rincian',
  templateUrl: './sts-penetapan-rincian.component.html',
  styleUrls: ['./sts-penetapan-rincian.component.scss']
})
export class StsPenetapanRincianComponent implements OnInit, OnChanges, OnDestroy {
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
