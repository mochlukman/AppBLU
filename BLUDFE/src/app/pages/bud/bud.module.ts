import { NgModule } from '@angular/core';
import { BudRoutingModule } from './bud-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    SharedModule,
    BudRoutingModule
  ]
})
export class BudModule { }
