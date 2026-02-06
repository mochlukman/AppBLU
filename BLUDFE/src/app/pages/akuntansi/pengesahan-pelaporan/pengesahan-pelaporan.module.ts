import { NgModule } from '@angular/core';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';

import { PengesahanPelaporanRoutingModule } from './pengesahan-pelaporan-routing.module';
import { Sp3bComponent } from './sp3b/sp3b.component';
import { Sp3bFormComponent } from './sp3b/sp3b-form/sp3b-form.component';
import { Sp3bMainComponent } from './sp3b-main/sp3b-main.component';
import { Sp3bSahComponent } from './sp3b-sah/sp3b-sah.component';
import { Sp3bFormSahComponent } from './sp3b-sah/sp3b-form-sah/sp3b-form-sah.component';
import { Sp3bRincianComponent } from './sp3b/sp3b-rincian/sp3b-rincian.component';
import { Sp3bSahRincianComponent } from './sp3b-sah/sp3b-sah-rincian/sp3b-sah-rincian.component';
import { Sp2bMainComponent } from './sp2b-main/sp2b-main.component';
import { Sp2bComponent } from './sp2b-main/sp2b/sp2b.component';
import { Sp2bFormComponent } from './sp2b-main/sp2b/sp2b-form/sp2b-form.component';
import { Sp2bRincianComponent } from './sp2b-main/sp2b/sp2b-rincian/sp2b-rincian.component';
import { TabSp2bRincianComponent } from './sp2b-main/sp2b/sp2b-rincian/tab-sp2b-rincian/tab-sp2b-rincian.component';
import { TabSp3bRincianComponent } from './sp2b-main/sp2b/sp2b-rincian/tab-sp3b-rincian/tab-sp3b-rincian.component';
import { Sp2bSahComponent } from './sp2b-main/sp2b-sah/sp2b-sah.component';
import { Sp2bSahFormComponent } from './sp2b-main/sp2b-sah/sp2b-sah-form/sp2b-sah-form.component';
import { Sp2bSahRincianComponent } from './sp2b-main/sp2b-sah/sp2b-sah-rincian/sp2b-sah-rincian.component';
import { TabSp2bSahRincianComponent } from './sp2b-main/sp2b-sah/sp2b-sah-rincian/tab-sp2b-sah-rincian/tab-sp2b-sah-rincian.component';
import { TabSp3bSahRincianComponent } from './sp2b-main/sp2b-sah/sp2b-sah-rincian/tab-sp3b-sah-rincian/tab-sp3b-sah-rincian.component';


@NgModule({
  declarations: [Sp3bComponent, Sp3bFormComponent, Sp3bMainComponent, Sp3bSahComponent, Sp3bFormSahComponent, Sp3bRincianComponent, Sp3bSahRincianComponent, Sp2bMainComponent, Sp2bComponent, Sp2bFormComponent, Sp2bRincianComponent, TabSp2bRincianComponent, TabSp3bRincianComponent, Sp2bSahComponent, Sp2bSahFormComponent, Sp2bSahRincianComponent, TabSp2bSahRincianComponent, TabSp3bSahRincianComponent],
  imports: [
    CoreModule,
    SharedModule,
    PengesahanPelaporanRoutingModule
  ]
})
export class PengesahanPelaporanModule { }
