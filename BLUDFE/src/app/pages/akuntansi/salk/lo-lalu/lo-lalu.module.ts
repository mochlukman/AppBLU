import { NgModule } from '@angular/core';
import { LoLaluRoutingModule } from './lo-lalu-routing.module';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import { PendapatanComponent } from './pendapatan/pendapatan.component';
import { PendapatanFormComponent } from './pendapatan/pendapatan-form/pendapatan-form.component';
import { BebanComponent } from './beban/beban.component';
import { BebanFormComponent } from './beban/beban-form/beban-form.component';


@NgModule({
  declarations: [
    PendapatanComponent,
    PendapatanFormComponent,
    BebanComponent,
    BebanFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    LoLaluRoutingModule
  ]
})
export class LoLaluModule { }
