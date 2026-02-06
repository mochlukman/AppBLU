import {Component, OnDestroy, OnInit} from '@angular/core';
import {ITokenClaim} from 'src/app/core/interface/itoken-claim';
import {GlobalService} from 'src/app/core/services/global.service';
import {AuthenticationService} from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-map-utang-pfk',
  templateUrl: './map-utang-pfk.component.html',
  styleUrls: ['./map-utang-pfk.component.scss']
})
export class MapUtangPfkComponent implements OnInit, OnDestroy {
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

