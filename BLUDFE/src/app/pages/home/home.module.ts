import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '../home/home.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashApbdComponent } from './dashboard/dash-apbd/dash-apbd.component';
import { DashKomposisiApbdComponent } from './dashboard/dash-komposisi-apbd/dash-komposisi-apbd.component';
import { DashKomposisiUrusanDaerahComponent } from './dashboard/dash-komposisi-urusan-daerah/dash-komposisi-urusan-daerah.component';
import { DashBelanjaPerangkatDaerahComponent } from './dashboard/dash-belanja-perangkat-daerah/dash-belanja-perangkat-daerah.component';


@NgModule({
  declarations: [HomeComponent, DashboardComponent, DashApbdComponent, DashKomposisiApbdComponent, DashKomposisiUrusanDaerahComponent, DashBelanjaPerangkatDaerahComponent],
  imports: [
    CoreModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
