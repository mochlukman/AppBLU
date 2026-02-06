import { Component, OnDestroy, OnInit } from '@angular/core';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import {GlobalService} from 'src/app/core/services/global.service';

@Component({
  selector: 'app-korolari',
  templateUrl: './korolari.component.html',
  styleUrls: ['./korolari.component.scss']
})
export class KorolariComponent implements OnInit, OnDestroy {
  title: string = '';
  userInfo: ITokenClaim;
  constructor(
    private global: GlobalService,
    private authService: AuthenticationService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.userInfo = this.authService.getTokenInfo();
  }
  ngOnInit() {
  }
  ngOnDestroy(): void{
  }
}
