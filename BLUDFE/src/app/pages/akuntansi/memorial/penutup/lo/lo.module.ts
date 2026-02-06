import { NgModule } from '@angular/core';
import { LoRoutingModule } from './lo-routing.module';
import { LoComponent } from './lo.component';
import { LoFormComponent } from './lo-form/lo-form.component';
import { LoDetailComponent } from './lo-detail/lo-detail.component';
import { LoRincianComponent } from './lo-detail/lo-rincian/lo-rincian.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    LoComponent, 
    LoFormComponent, 
    LoDetailComponent, 
    LoRincianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    LoRoutingModule
  ]
})
export class LoModule { }
