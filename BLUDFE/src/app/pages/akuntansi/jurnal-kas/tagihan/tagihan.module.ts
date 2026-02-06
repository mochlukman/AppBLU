import { NgModule } from '@angular/core';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { TagihanRoutingModule } from './tagihan-routing.module';
import { TagihanMainComponent } from './tagihan-main/tagihan-main.component';
import { TagihanBastComponent } from './tagihan-bast/tagihan-bast.component';
import { TagihanBastDetailComponent } from './tagihan-bast/tagihan-bast-detail/tagihan-bast-detail.component';


@NgModule({
  declarations: [
    TagihanMainComponent,
    TagihanBastComponent,
    TagihanBastDetailComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    TagihanRoutingModule
  ]
})
export class TagihanModule { }
