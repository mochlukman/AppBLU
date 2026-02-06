import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISkp } from 'src/app/core/interface/iskp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SkpdetService } from 'src/app/core/services/skpdet.service';

@Component({
  selector: 'app-skr-main-rincian',
  templateUrl: './skr-main-rincian.component.html',
  styleUrls: ['./skr-main-rincian.component.scss']
})
export class SkrMainRincianComponent implements OnInit, OnChanges, OnDestroy {
  tabIndex: number = 0;
  @Input() SkpSelected : ISkp;
  userInfo: ITokenClaim
  constructor(
    private service: SkpdetService,
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
    this.SkpSelected = null;
  }
}

