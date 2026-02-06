import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { IDaftunit } from 'src/app/core/interface/idaftunit';
import { IDisplayGlobal } from 'src/app/core/interface/iglobal';
import { ISpd, ISpddetb } from 'src/app/core/interface/ispd';
import { ITokenClaim } from 'src/app/core/interface/itoken-claim';
import { AuthenticationService } from 'src/app/core/services/auth.service';
import { SpdService } from 'src/app/core/services/spd.service';
import { SpddetbService } from 'src/app/core/services/spddetb.service';
import {GlobalService} from 'src/app/core/services/global.service';
import { NotifService } from 'src/app/core/_commonServices/notif.service';
import { eRekening } from 'src/app/core/_enum/etahap';
import { LookDaftunitComponent } from 'src/app/shared/lookups/look-daftunit/look-daftunit.component';
import { FormSpdbComponent } from './spd-pembiayaan-pembuatan/form-spdb/form-spdb.component';

@Component({
  selector: 'app-spd-pembiayaan',
  templateUrl: './spd-pembiayaan.component.html',
  styleUrls: ['./spd-pembiayaan.component.scss']
})
export class SpdPembiayaanComponent implements OnInit, OnDestroy {
  title: string = '';
  tabIndex: number = 0;
  constructor(
    private global: GlobalService
  ) {
    this.global._title.subscribe(resp => this.title = resp);
    this.tabIndex = 0;
  }
  ngOnInit() {
  }
  onChangeTab(e: any){
    this.tabIndex = e.index;
	}
  ngOnDestroy(): void{
    this.tabIndex = 0;
  }
}
