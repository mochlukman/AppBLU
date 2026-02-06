import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnggaranRoutingModule } from './anggaran-routing.module';
import { PendapatanComponent } from './apbd/pendapatan/pendapatan.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BelanjaComponent } from './apbd/belanja/belanja.component';
import { RkaDPenjabaranComponent } from './apbd/pendapatan/rka-dpenjabaran/rka-dpenjabaran.component';
import { RkaRPenjabaranComponent } from './apbd/belanja/rka-rpenjabaran/rka-rpenjabaran.component';
import { RkadFormComponent } from './apbd/pendapatan/rkad-form/rkad-form.component';
import { RkadetdFormComponent } from './apbd/pendapatan/rka-dpenjabaran/rkadetd-form/rkadetd-form.component';
import { RkarFormComponent } from './apbd/belanja/rkar-form/rkar-form.component';
import { RkadetrFormComponent } from './apbd/belanja/rka-rpenjabaran/rkadetr-form/rkadetr-form.component';
import { PembiayaanComponent } from './apbd/pembiayaan/pembiayaan.component';
import { Rkab61Component } from './apbd/pembiayaan/rkab61/rkab61.component';
import { Rkab61FormComponent } from './apbd/pembiayaan/rkab61/rkab61-form/rkab61-form.component';
import { Rkab61PenjabaranComponent } from './apbd/pembiayaan/rkab61/rkab61-penjabaran/rkab61-penjabaran.component';
import { Rkab61PenjabaranFormComponent } from './apbd/pembiayaan/rkab61/rkab61-penjabaran/rkab61-penjabaran-form/rkab61-penjabaran-form.component';
import { Rkab62Component } from './apbd/pembiayaan/rkab62/rkab62.component';
import { Rkab62FormComponent } from './apbd/pembiayaan/rkab62/rkab62-form/rkab62-form.component';
import { Rkab62PenjabaranComponent } from './apbd/pembiayaan/rkab62/rkab62-penjabaran/rkab62-penjabaran.component';
import { Rkab62PenjabaranFormComponent } from './apbd/pembiayaan/rkab62/rkab62-penjabaran/rkab62-penjabaran-form/rkab62-penjabaran-form.component';
import { RkardanaComponent } from './apbd/belanja/rkardana/rkardana.component';
import { RkardanaFormComponent } from './apbd/belanja/rkardana/rkardana-form/rkardana-form.component';
import { PendapatanxComponent } from './apbdx/pendapatanx/pendapatanx.component';
import { RkaDpenjabaranxComponent } from './apbdx/pendapatanx/rka-dpenjabaranx/rka-dpenjabaranx.component';
import { RkadFormxComponent } from './apbdx/pendapatanx/rkad-formx/rkad-formx.component';
import { RkadetdFormxComponent } from './apbdx/pendapatanx/rka-dpenjabaranx/rkadetd-formx/rkadetd-formx.component';
import { BelanjaxComponent } from './apbdx/belanjax/belanjax.component';
import { RkaRpenjabaranxComponent } from './apbdx/belanjax/rka-rpenjabaranx/rka-rpenjabaranx.component';
import { RkadetrFormxComponent } from './apbdx/belanjax/rka-rpenjabaranx/rkadetr-formx/rkadetr-formx.component';
import { RkarFormxComponent } from './apbdx/belanjax/rkar-formx/rkar-formx.component';
import { RkardanaxComponent } from './apbdx/belanjax/rkardanax/rkardanax.component';
import { RkardanaFormxComponent } from './apbdx/belanjax/rkardanax/rkardana-formx/rkardana-formx.component';
import { PembiayaanxComponent } from './apbdx/pembiayaanx/pembiayaanx.component';
import { Rka61xComponent } from './apbdx/pembiayaanx/rka61x/rka61x.component';
import { Rka62xComponent } from './apbdx/pembiayaanx/rka62x/rka62x.component';
import { Rka61FormxComponent } from './apbdx/pembiayaanx/rka61x/rka61-formx/rka61-formx.component';
import { Rka61PenjabaranxComponent } from './apbdx/pembiayaanx/rka61x/rka61-penjabaranx/rka61-penjabaranx.component';
import { Rka61PenjabaranFormxComponent } from './apbdx/pembiayaanx/rka61x/rka61-penjabaranx/rka61-penjabaran-formx/rka61-penjabaran-formx.component';
import { Rka62FormxComponent } from './apbdx/pembiayaanx/rka62x/rka62-formx/rka62-formx.component';
import { Rka62PenjabaranxComponent } from './apbdx/pembiayaanx/rka62x/rka62-penjabaranx/rka62-penjabaranx.component';
import { Rka62PenjabaranFormxComponent } from './apbdx/pembiayaanx/rka62x/rka62-penjabaranx/rka62-penjabaran-formx/rka62-penjabaran-formx.component';
import { TransferApbdComponent } from './transfer-apbd/transfer-apbd.component';
import { TransferApbdxPergeseranComponent } from './apbdx/transfer-apbdx-pergeseran/transfer-apbdx-pergeseran.component';


@NgModule({
  declarations: [
    PendapatanComponent,
    BelanjaComponent,
    RkaDPenjabaranComponent,
    RkaRPenjabaranComponent,
    RkadFormComponent,
    RkadetdFormComponent,
    RkarFormComponent,
    RkadetrFormComponent,
    PembiayaanComponent,
    Rkab61Component,
    Rkab61FormComponent,
    Rkab61PenjabaranComponent,
    Rkab61PenjabaranFormComponent,
    Rkab62Component,
    Rkab62FormComponent,
    Rkab62PenjabaranComponent,
    Rkab62PenjabaranFormComponent,
    RkardanaComponent,
    RkardanaFormComponent,
    PendapatanxComponent,
    RkaDpenjabaranxComponent,
    RkadFormxComponent,
    RkadetdFormxComponent,
    BelanjaxComponent,
    RkaRpenjabaranxComponent,
    RkadetrFormxComponent,
    RkarFormxComponent,
    RkardanaxComponent,
    RkardanaFormxComponent,
    PembiayaanxComponent,
    Rka61xComponent,
    Rka62xComponent,
    Rka61FormxComponent,
    Rka61PenjabaranxComponent,
    Rka61PenjabaranFormxComponent,
    Rka62FormxComponent,
    Rka62PenjabaranxComponent,
    Rka62PenjabaranFormxComponent,
    TransferApbdComponent,
    TransferApbdxPergeseranComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AnggaranRoutingModule
  ]
})
export class AnggaranModule { }
