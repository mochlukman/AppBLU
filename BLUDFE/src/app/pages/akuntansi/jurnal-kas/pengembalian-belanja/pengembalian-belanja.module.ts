import { NgModule } from '@angular/core';
import { PengembalianBelanjaRoutingModule } from './pengembalian-belanja-routing.module';
import { JurnalKasMainComponent } from './jurnal-kas-main/jurnal-kas-main.component';
import { JurnalPengembalianComponent } from './jurnal-pengembalian/jurnal-pengembalian.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    JurnalKasMainComponent,
    JurnalPengembalianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PengembalianBelanjaRoutingModule
  ]
})
export class PengembalianBelanjaModule { }
