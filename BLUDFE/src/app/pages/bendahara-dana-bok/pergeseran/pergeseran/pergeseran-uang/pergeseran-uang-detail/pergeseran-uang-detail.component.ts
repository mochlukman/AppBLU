import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {IBkbank} from 'src/app/core/interface/ibkbank';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {BkbankdetService} from 'src/app/core/services/bkbankdet.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-pergeseran-uang-detail',
  templateUrl: './pergeseran-uang-detail.component.html',
  styleUrls: ['./pergeseran-uang-detail.component.scss']
})
export class PergeseranUangDetailComponent implements OnInit, OnDestroy, OnChanges {
  tabIndex: number = 0;
  @Input() BkbankSelected : IBkbank;
  userInfo: ITokenClaim
  constructor(
    private service: BkbankdetService,
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
    this.BkbankSelected = null;
  }
}
