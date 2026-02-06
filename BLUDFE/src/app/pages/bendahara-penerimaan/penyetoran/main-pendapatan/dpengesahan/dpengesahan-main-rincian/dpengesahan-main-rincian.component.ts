import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ISts } from 'src/app/core/interface/ists';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-dpengesahan-main-rincian',
  templateUrl: './dpengesahan-main-rincian.component.html',
  styleUrls: ['./dpengesahan-main-rincian.component.scss']
})
export class DpengesahanMainRincianComponent implements OnInit, OnChanges, OnDestroy {
  @Input() StsSelected : ISts;
  userInfo: ITokenClaim;
  group1: boolean;
  group2: boolean;
  tabIndex: number = 0;
  constructor(
    private authService: AuthenticationService
  ) {
    this.group1 = false;
    this.group2 = false;
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(changes.StsSelected){
      if(['16'].indexOf(changes.StsSelected.currentValue.kdstatus.trim()) > -1){
        this.group1 = true;
        this.group2 = false;
      }
      if(['60','61','62','63','64','65'].indexOf(changes.StsSelected.currentValue.kdstatus.trim()) > -1){
        this.group1 = false;
        this.group2 = true;
      }
    } 
  }
  ngOnInit() {
    this.tabIndex = 0;
  }
  onChangeTab(e: any){
    this.tabIndex = e.index;
  }
  ngOnDestroy(): void {
    this.StsSelected = null;
    this.group1 = true;
    this.group2 = false;
    this.tabIndex = 0;
  }
}
