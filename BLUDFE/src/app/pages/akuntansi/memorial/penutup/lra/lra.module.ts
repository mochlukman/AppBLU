import { NgModule } from '@angular/core';
import { LraRoutingModule } from './lra-routing.module';
import { LraComponent } from './lra.component';
import { LraFormComponent } from './lra-form/lra-form.component';
import { LraDetailComponent } from './lra-detail/lra-detail.component';
import { LraRincianComponent } from './lra-detail/lra-rincian/lra-rincian.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LraComponent,
    LraFormComponent,
    LraDetailComponent,
    LraRincianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    LraRoutingModule
  ]
})
export class LraModule { }
