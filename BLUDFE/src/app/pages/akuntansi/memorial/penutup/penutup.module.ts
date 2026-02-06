import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PenutupRoutingModule } from './penutup-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    SharedModule,
    PenutupRoutingModule
  ]
})
export class PenutupModule { }
