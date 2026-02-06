import { NgModule } from '@angular/core';
import { LraLaluRoutingModule } from './lra-lalu-routing.module';
import { PendapatanComponent } from './pendapatan/pendapatan.component';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import { PendapatanFormComponent } from './pendapatan/pendapatan-form/pendapatan-form.component';
import { BelanjaComponent } from './belanja/belanja.component';
import { BelanjaFormComponent } from './belanja/belanja-form/belanja-form.component';
import { PembiayaanComponent } from './pembiayaan/pembiayaan.component';
import { PembiayaanFormComponent } from './pembiayaan/pembiayaan-form/pembiayaan-form.component';


@NgModule({
  declarations: [
    PendapatanComponent,
    PendapatanFormComponent,
    BelanjaComponent,
    BelanjaFormComponent,
    PembiayaanComponent,
    PembiayaanFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    LraLaluRoutingModule
  ]
})
export class LraLaluModule { }
