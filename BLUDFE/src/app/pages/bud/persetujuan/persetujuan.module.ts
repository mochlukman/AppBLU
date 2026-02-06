import { NgModule } from '@angular/core';
import { PersetujuanRoutingModule } from './persetujuan-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PersetujuanTuComponent } from './persetujuan-tu/persetujuan-tu.component';
import { PengajuanTuComponent } from './persetujuan-tu/pengajuan-tu/pengajuan-tu.component';
import { DetailTuPengajuanComponent } from './persetujuan-tu/pengajuan-tu/detail-tu-pengajuan/detail-tu-pengajuan.component';
import { DetailTuPembebananPengajuanComponent } from './persetujuan-tu/pengajuan-tu/detail-tu-pengajuan/detail-tu-pembebanan-pengajuan/detail-tu-pembebanan-pengajuan.component';
import { PengesahanTuComponent } from './persetujuan-tu/pengesahan-tu/pengesahan-tu.component';
import { DetailTuPengesahanComponent } from './persetujuan-tu/pengesahan-tu/detail-tu-pengesahan/detail-tu-pengesahan.component';
import { DetailTuPembebananPengesahanComponent } from './persetujuan-tu/pengesahan-tu/detail-tu-pengesahan/detail-tu-pembebanan-pengesahan/detail-tu-pembebanan-pengesahan.component';
import { PengesahanTuFormComponent } from './persetujuan-tu/pengesahan-tu/pengesahan-tu-form/pengesahan-tu-form.component';
import { PengesahanTuCheckComponent } from './persetujuan-tu/pengesahan-tu/pengesahan-tu-check/pengesahan-tu-check.component';


@NgModule({
  declarations: [
    PersetujuanTuComponent, 
    PengajuanTuComponent, 
    DetailTuPengajuanComponent, DetailTuPembebananPengajuanComponent, PengesahanTuComponent, DetailTuPengesahanComponent, DetailTuPembebananPengesahanComponent, PengesahanTuFormComponent, PengesahanTuCheckComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PersetujuanRoutingModule
  ]
})
export class PersetujuanModule { }
