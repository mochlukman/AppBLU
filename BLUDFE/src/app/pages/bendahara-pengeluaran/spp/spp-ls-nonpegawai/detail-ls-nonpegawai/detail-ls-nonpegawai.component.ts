import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ILookupTree } from 'src/app/core/interface/iglobal';
import { ISpp } from 'src/app/core/interface/ispp';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SppdetrService } from 'src/app/core/services/sppdetr.service';

@Component({
  selector: 'app-detail-ls-nonpegawai',
  templateUrl: './detail-ls-nonpegawai.component.html',
  styleUrls: ['./detail-ls-nonpegawai.component.scss']
})
export class DetailLsNonpegawaiComponent implements OnInit, OnDestroy, OnChanges {
  tabIndex: number = 0;
  @Input() SppSelected : ISpp;
  @Input() KegSelected : ILookupTree;
  userInfo: ITokenClaim
  constructor(
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
    this.KegSelected = null;
  }
}