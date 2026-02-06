import { NgModule } from '@angular/core';
import { EliminasiRoutingModule } from './eliminasi-routing.module';
import { EliminasiComponent } from './eliminasi.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { EliminasiFormComponent } from './eliminasi-form/eliminasi-form.component';
import { EliminasiDetailComponent } from './eliminasi-detail/eliminasi-detail.component';
import { EliminasiRincianComponent } from './eliminasi-detail/eliminasi-rincian/eliminasi-rincian.component';


@NgModule({
  declarations: [
    EliminasiComponent,
    EliminasiFormComponent,
    EliminasiDetailComponent,
    EliminasiRincianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    EliminasiRoutingModule
  ]
})
export class EliminasiModule { }
