import { NgModule } from '@angular/core';
import { SurflusRoutingModule } from './surflus-routing.module';
import { SurflusComponent } from './surflus.component';
import { SurflusFormComponent } from './surflus-form/surflus-form.component';
import { SurflusDetailComponent } from './surflus-detail/surflus-detail.component';
import { SurflusRincianComponent } from './surflus-detail/surflus-rincian/surflus-rincian.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    SurflusComponent, 
    SurflusFormComponent, 
    SurflusDetailComponent, 
    SurflusRincianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    SurflusRoutingModule
  ]
})
export class SurflusModule { }
