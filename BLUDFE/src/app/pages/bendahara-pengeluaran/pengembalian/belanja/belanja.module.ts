import { NgModule } from '@angular/core';
import { BelanjaRoutingModule } from './belanja-routing.module';
import { BelanjaComponent } from './belanja.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PengajuanComponent } from './pengajuan/pengajuan.component';
import { PengajuanFormComponent } from './pengajuan/pengajuan-form/pengajuan-form.component';
import { PengajuanDetailComponent } from './pengajuan/pengajuan-detail/pengajuan-detail.component';
import { RincianBelanjaComponent } from './pengajuan/pengajuan-detail/rincian-belanja/rincian-belanja.component';
import { RincianBelanjaFormComponent } from './pengajuan/pengajuan-detail/rincian-belanja/rincian-belanja-form/rincian-belanja-form.component';
import { PengesahanComponent } from './pengesahan/pengesahan.component';
import { PengesahanFormComponent } from './pengesahan/pengesahan-form/pengesahan-form.component';
import { PengesahanDetailComponent } from './pengesahan/pengesahan-detail/pengesahan-detail.component';
import { PengesahanRincianBelanjaComponent } from './pengesahan/pengesahan-detail/pengesahan-rincian-belanja/pengesahan-rincian-belanja.component';


@NgModule({
  declarations: [
    BelanjaComponent, 
    PengajuanComponent, 
    PengajuanFormComponent, PengajuanDetailComponent, RincianBelanjaComponent, RincianBelanjaFormComponent, PengesahanComponent, PengesahanFormComponent, PengesahanDetailComponent, PengesahanRincianBelanjaComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BelanjaRoutingModule
  ]
})
export class BelanjaModule { }
