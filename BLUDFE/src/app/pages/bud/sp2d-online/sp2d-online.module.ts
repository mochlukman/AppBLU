import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Sp2dOnlineRoutingModule } from './sp2d-online-routing.module';
import { DaftarPengujiComponent } from './daftar-penguji/daftar-penguji.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DaftarPengujiDetailComponent } from './daftar-penguji/daftar-penguji-detail/daftar-penguji-detail.component';
import { DaftarPengujiDetailFormComponent } from './daftar-penguji/daftar-penguji-detail-form/daftar-penguji-detail-form.component';
import { DaftarPengujiFormComponent } from './daftar-penguji/daftar-penguji-form/daftar-penguji-form.component';
import { PengirimanDaftarPengujiComponent } from './pengiriman-daftar-penguji/pengiriman-daftar-penguji.component';
import { Sp2dNtpnComponent } from './sp2d-ntpn/sp2d-ntpn.component';
import { Sp2dNtpnFormComponent } from './sp2d-ntpn/sp2d-ntpn-form/sp2d-ntpn-form.component';


@NgModule({
  declarations: [
    DaftarPengujiComponent,
    DaftarPengujiFormComponent,
    DaftarPengujiDetailComponent,
    DaftarPengujiDetailFormComponent,
    PengirimanDaftarPengujiComponent,
    Sp2dNtpnComponent,
    Sp2dNtpnFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    Sp2dOnlineRoutingModule
  ]
})
export class Sp2dOnlineModule { }
