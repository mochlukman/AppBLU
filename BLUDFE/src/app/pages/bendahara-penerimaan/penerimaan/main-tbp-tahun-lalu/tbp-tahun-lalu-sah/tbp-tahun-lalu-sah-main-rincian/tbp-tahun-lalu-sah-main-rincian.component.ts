import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ITbp} from 'src/app/core/interface/itbp';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {TbpdetdService} from 'src/app/core/services/tbpdetd.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-tbp-tahun-lalu-sah-main-rincian',
  templateUrl: './tbp-tahun-lalu-sah-main-rincian.component.html',
  styleUrls: ['./tbp-tahun-lalu-sah-main-rincian.component.scss']
})
export class TbpTahunLaluSahMainRincianComponent implements OnInit, OnChanges, OnDestroy {
  tabIndex: number = 0;
  @Input() TbpSelected : ITbp;
  userInfo: ITokenClaim;
  constructor(
    private service: TbpdetdService,
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
    this.TbpSelected = null;
  }
}
