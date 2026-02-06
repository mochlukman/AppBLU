import { NgModule } from '@angular/core';
import { ActivationRoutingModule } from './activation-routing.module';
import { ActiveFormComponent } from './active-form/active-form.component';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [ActiveFormComponent],
  imports: [
    CoreModule,
    SharedModule,
    ActivationRoutingModule,
    NgbAlertModule
  ]
})
export class ActivationModule { }
