import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpm } from 'src/app/core/interface/ispm';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';

@Component({
  selector: 'app-spm-ls-uangmuka-detailver',
  templateUrl: './spm-ls-uangmuka-detailver.component.html',
  styleUrls: ['./spm-ls-uangmuka-detailver.component.scss']
})
export class SpmLsUangmukaDetailverComponent implements OnInit, OnDestroy, OnChanges {
  tabIndex: number = 0;
  @Input() SpmSelected : ISpm;
  @Input() KegSelected : ILookupTree;
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
    this.SpmSelected = null;
    this.KegSelected = null;
  }
}
