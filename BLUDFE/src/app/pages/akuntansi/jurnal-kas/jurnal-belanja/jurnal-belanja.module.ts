import { NgModule } from '@angular/core';
import { JurnalBelanjaRoutingModule } from './jurnal-belanja-routing.module';
import { JurnalBelanjaMainComponent } from './jurnal-belanja-main/jurnal-belanja-main.component';
import { JurnalBelanjaUpComponent } from './jurnal-belanja-up/jurnal-belanja-up.component';
import { JurnalBelanjaUpFormComponent } from './jurnal-belanja-up/jurnal-belanja-up-form/jurnal-belanja-up-form.component';
import { JurnalBelanjaUpDetailComponent } from './jurnal-belanja-up/jurnal-belanja-up-detail/jurnal-belanja-up-detail.component';
import { JurnalBelanjaUpDetailBelanjaComponent } from './jurnal-belanja-up/jurnal-belanja-up-detail/jurnal-belanja-up-detail-belanja/jurnal-belanja-up-detail-belanja.component';
import { JurnalBelanjaUpDetailBelanjaRincianComponent } from './jurnal-belanja-up/jurnal-belanja-up-detail/jurnal-belanja-up-detail-belanja-rincian/jurnal-belanja-up-detail-belanja-rincian.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { JurnalBelanjaUpDetailRincianJurnalComponent } from './jurnal-belanja-up/jurnal-belanja-up-detail/jurnal-belanja-up-detail-rincian-jurnal/jurnal-belanja-up-detail-rincian-jurnal.component';


@NgModule({
  declarations: [
    JurnalBelanjaMainComponent, 
    JurnalBelanjaUpComponent, 
    JurnalBelanjaUpFormComponent, 
    JurnalBelanjaUpDetailComponent, 
    JurnalBelanjaUpDetailBelanjaComponent, 
    JurnalBelanjaUpDetailBelanjaRincianComponent, JurnalBelanjaUpDetailRincianJurnalComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    JurnalBelanjaRoutingModule
  ]
})
export class JurnalBelanjaModule { }
