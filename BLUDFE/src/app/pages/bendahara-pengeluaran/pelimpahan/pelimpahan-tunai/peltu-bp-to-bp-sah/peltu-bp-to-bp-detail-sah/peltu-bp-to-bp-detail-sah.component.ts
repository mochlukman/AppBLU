import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ITbp} from 'src/app/core/interface/itbp';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {TbpdettService} from 'src/app/core/services/tbpdett.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-peltu-bp-to-bp-detail-sah',
  templateUrl: './peltu-bp-to-bp-detail-sah.component.html',
  styleUrls: ['./peltu-bp-to-bp-detail-sah.component.scss']
})
export class PeltuBpToBpDetailSahComponent implements OnInit, OnDestroy, OnChanges {
  tabIndex: number = 0;
  @Input() TbpSelected : ITbp;
  userInfo: ITokenClaim
  constructor(
    private service: TbpdettService,
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
