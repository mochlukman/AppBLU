import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-akun',
  templateUrl: './akun.component.html',
  styleUrls: ['./akun.component.scss']
})
export class AkunComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  userInfo: ITokenClaim;
  constructor(
    private global: GlobalService,
    private authService: AuthenticationService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
    this.tabIndex = 0;
  }
  onChangeTab(e: any){
		this.tabIndex = e.index;
	}
  ngOnDestroy(): void{
    this.tabIndex = 0;
  }
}
