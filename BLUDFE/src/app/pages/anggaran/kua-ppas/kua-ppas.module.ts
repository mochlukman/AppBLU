import { NgModule } from '@angular/core';
import { KuaPpasRoutingModule } from './kua-ppas-routing.module';

import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { KegUnitComponent } from './program-kegiatan-unit/keg-unit/keg-unit.component';
import { ProgUnitComponent } from './program-kegiatan-unit/prog-unit/prog-unit.component';
import { ProgUnitFormComponent } from './program-kegiatan-unit/prog-unit-form/prog-unit-form.component';
import { KegUnitFormComponent } from './program-kegiatan-unit/keg-unit-form/keg-unit-form.component';
import { KegUnitFormSubkegComponent } from './program-kegiatan-unit/keg-unit-form-subkeg/keg-unit-form-subkeg.component';
import { KinerjaComponent } from './kinerja/kinerja.component';
import { KinkegComponent } from './kinerja/kinkeg/kinkeg.component';
import { KinkegFormComponent } from './kinerja/kinkeg/kinkeg-form/kinkeg-form.component';
import { KinkegSubComponent } from './kinerja/kinkeg-sub/kinkeg-sub.component';
import { KinkegSubFormComponent } from './kinerja/kinkeg-sub/kinkeg-sub-form/kinkeg-sub-form.component';
import { KegDanaComponent } from './program-kegiatan-unit/keg-dana/keg-dana.component';
import { KegDanaFormComponent } from './program-kegiatan-unit/keg-dana/keg-dana-form/keg-dana-form.component';



@NgModule({
  declarations: [
    ProgUnitComponent, 
    ProgUnitFormComponent, 
    KegUnitComponent, 
    KegUnitFormComponent, 
    KegUnitFormSubkegComponent, 
    KinerjaComponent, 
    KinkegComponent, 
    KinkegFormComponent, 
    KinkegSubComponent, 
    KinkegSubFormComponent, 
    KegDanaComponent, 
    KegDanaFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    KuaPpasRoutingModule
  ]
})
export class KuaPpasModule { }
