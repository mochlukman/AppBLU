import { NgModule } from '@angular/core';
import { VerifikasiApbdRoutingModule } from './verifikasi-apbd-routing.module';
import { MainPageComponent } from './main-page/main-page.component';
import { CoreModule } from 'src/app/core/core.module';
import { PendapatanComponent } from './pendapatan/pendapatan.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TapddComponent } from './pendapatan/tapdd/tapdd.component';
import { TapddFormComponent } from './pendapatan/tapdd/tapdd-form/tapdd-form.component';
import { TapddetdComponent } from './pendapatan/tapddetd/tapddetd.component';
import { TapddetdFormComponent } from './pendapatan/tapddetd/tapddetd-form/tapddetd-form.component';
import { RkadetdComponent } from './pendapatan/rkadetd/rkadetd.component';
import { BelanjaComponent } from './belanja/belanja.component';
import { TapdrComponent } from './belanja/tapdr/tapdr.component';
import { TapddetrComponent } from './belanja/tapddetr/tapddetr.component';
import { RkadetrComponent } from './belanja/rkadetr/rkadetr.component';
import { TapdrFormComponent } from './belanja/tapdr/tapdr-form/tapdr-form.component';
import { TapddetrFormComponent } from './belanja/tapddetr/tapddetr-form/tapddetr-form.component';
import { RkardanaComponent } from './belanja/rkardana/rkardana.component';
import { PembiayaanComponent } from './pembiayaan/pembiayaan.component';
import { RkadetbComponent } from './pembiayaan/rkadetb/rkadetb.component';
import { TapdbComponent } from './pembiayaan/tapdb/tapdb.component';
import { TapdbFormComponent } from './pembiayaan/tapdb/tapdb-form/tapdb-form.component';
import { TapddetbComponent } from './pembiayaan/tapddetb/tapddetb.component';
import { TapddetbFormComponent } from './pembiayaan/tapddetb/tapddetb-form/tapddetb-form.component';
import { PengesahanComponent } from './pengesahan/pengesahan.component';
import { PengesahanFormComponent } from './pengesahan/pengesahan-form/pengesahan-form.component';


@NgModule({
  declarations: [
    MainPageComponent,
    PendapatanComponent,
    TapddComponent,
    TapddFormComponent,
    TapddetdComponent,
    TapddetdFormComponent,
    RkadetdComponent,
    BelanjaComponent,
    TapdrComponent,
    TapddetrComponent,
    RkadetrComponent,
    TapdrFormComponent,
    TapddetrFormComponent,
    RkardanaComponent,
    PembiayaanComponent,
    RkadetbComponent,
    TapdbComponent,
    TapdbFormComponent,
    TapddetbComponent,
    TapddetbFormComponent,
    PengesahanComponent,
    PengesahanFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    VerifikasiApbdRoutingModule
  ]
})
export class VerifikasiApbdModule { }
