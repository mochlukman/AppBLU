import { NgModule } from '@angular/core';
import { PanjarRoutingModule } from './panjar-routing.module';
import { PanjarMainComponent } from './panjar-main/panjar-main.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PanjarComponent } from './panjar-main/panjar/panjar.component';
import { PanjarFormComponent } from './panjar-main/panjar/panjar-form/panjar-form.component';
import { PanjarRincianComponent } from './panjar-main/panjar/panjar-rincian/panjar-rincian.component';
import { PanjarRincianFormComponent } from './panjar-main/panjar/panjar-rincian-form/panjar-rincian-form.component';
import { PanjarRincianKegiatanComponent } from './panjar-main/panjar/panjar-rincian-kegiatan/panjar-rincian-kegiatan.component';
import { PanjarPengesahanComponent } from './panjar-main/panjar-pengesahan/panjar-pengesahan.component';
import { PanjarFormPengesahanComponent } from './panjar-main/panjar-pengesahan/panjar-form-pengesahan/panjar-form-pengesahan.component';
import { PanjarRincianPengesahanComponent } from './panjar-main/panjar-pengesahan/panjar-rincian-pengesahan/panjar-rincian-pengesahan.component';
import { PanjarRincianKegiatanPengesahanComponent } from './panjar-main/panjar-pengesahan/panjar-rincian-kegiatan-pengesahan/panjar-rincian-kegiatan-pengesahan.component';


@NgModule({
  declarations: [PanjarMainComponent, PanjarComponent, PanjarFormComponent, PanjarRincianComponent, PanjarRincianFormComponent, PanjarRincianKegiatanComponent, PanjarPengesahanComponent, PanjarFormPengesahanComponent, PanjarRincianPengesahanComponent, PanjarRincianKegiatanPengesahanComponent],
  imports: [
    CoreModule,
    SharedModule,
    PanjarRoutingModule
  ]
})
export class PanjarModule { }
