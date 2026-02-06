import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VerifikasiApbdxRoutingModule } from './verifikasi-apbdx-routing.module';
import { MainPagexComponent } from './main-pagex/main-pagex.component';
import { BelanjaxComponent } from './belanjax/belanjax.component';
import { PembiayaanxComponent } from './pembiayaanx/pembiayaanx.component';
import { PendapatanxComponent } from './pendapatanx/pendapatanx.component';
import { RkadetrxComponent } from './belanjax/rkadetrx/rkadetrx.component';
import { RkardanaxComponent } from './belanjax/rkardanax/rkardanax.component';
import { TapddetrxComponent } from './belanjax/tapddetrx/tapddetrx.component';
import { TapdrxComponent } from './belanjax/tapdrx/tapdrx.component';
import { TapddetrFormxComponent } from './belanjax/tapddetrx/tapddetr-formx/tapddetr-formx.component';
import { TapdrFormxComponent } from './belanjax/tapdrx/tapdr-formx/tapdr-formx.component';
import { RkadetbxComponent } from './pembiayaanx/rkadetbx/rkadetbx.component';
import { TapdbxComponent } from './pembiayaanx/tapdbx/tapdbx.component';
import { TapdbFormxComponent } from './pembiayaanx/tapdbx/tapdb-formx/tapdb-formx.component';
import { TapddetbxComponent } from './pembiayaanx/tapddetbx/tapddetbx.component';
import { TapddetbFormxComponent } from './pembiayaanx/tapddetbx/tapddetb-formx/tapddetb-formx.component';
import { RkadetdxComponent } from './pendapatanx/rkadetdx/rkadetdx.component';
import { TapddxComponent } from './pendapatanx/tapddx/tapddx.component';
import { TapddFormxComponent } from './pendapatanx/tapddx/tapdd-formx/tapdd-formx.component';
import { TapddetdxComponent } from './pendapatanx/tapddetdx/tapddetdx.component';
import { TapddetdFormxComponent } from './pendapatanx/tapddetdx/tapddetd-formx/tapddetd-formx.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PengesahanxComponent } from './pengesahanx/pengesahanx.component';
import { PengesahanFormxComponent } from './pengesahanx/pengesahan-formx/pengesahan-formx.component';


@NgModule({
  declarations: [
    MainPagexComponent,
    BelanjaxComponent,
    PembiayaanxComponent,
    PendapatanxComponent,
    RkadetrxComponent,
    RkardanaxComponent,
    TapddetrxComponent,
    TapdrxComponent,
    TapddetrFormxComponent,
    TapdrFormxComponent,
    RkadetbxComponent,
    TapdbxComponent,
    TapdbFormxComponent,
    TapddetbxComponent,
    TapddetbFormxComponent,
    RkadetdxComponent,
    TapddxComponent,
    TapddFormxComponent,
    TapddetdxComponent,
    TapddetdFormxComponent,
    PengesahanxComponent,
    PengesahanFormxComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    VerifikasiApbdxRoutingModule
  ]
})
export class VerifikasiApbdxModule { }
