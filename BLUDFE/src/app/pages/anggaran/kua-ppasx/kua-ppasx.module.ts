import { NgModule } from '@angular/core';
import { KuaPpasxRoutingModule } from './kua-ppasx-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { ProgUnitxComponent } from './program-kegiatan-unitx/prog-unitx/prog-unitx.component';
import { ProgUnitFormxComponent } from './program-kegiatan-unitx/prog-unit-formx/prog-unit-formx.component';
import { KegDanaxComponent } from './program-kegiatan-unitx/keg-danax/keg-danax.component';
import { KegUnitxComponent } from './program-kegiatan-unitx/keg-unitx/keg-unitx.component';
import { KegUnitFormxComponent } from './program-kegiatan-unitx/keg-unit-formx/keg-unit-formx.component';
import { KegUnitFormSubkegxComponent } from './program-kegiatan-unitx/keg-unit-form-subkegx/keg-unit-form-subkegx.component';
import { KegDanaFormxComponent } from './program-kegiatan-unitx/keg-danax/keg-dana-formx/keg-dana-formx.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { KinerjaxComponent } from './kinerjax/kinerjax.component';
import { KinkegxComponent } from './kinerjax/kinkegx/kinkegx.component';
import { KinkegFormxComponent } from './kinerjax/kinkegx/kinkeg-formx/kinkeg-formx.component';
import { KinkegSubxComponent } from './kinerjax/kinkeg-subx/kinkeg-subx.component';
import { KinkegSubFormxComponent } from './kinerjax/kinkeg-subx/kinkeg-sub-formx/kinkeg-sub-formx.component';


@NgModule({
  declarations: [
  ProgUnitxComponent,
  ProgUnitFormxComponent,
  KegDanaxComponent,
  KegUnitxComponent,
  KegUnitFormxComponent,
  KegUnitFormSubkegxComponent,
  KegDanaFormxComponent,
  KinerjaxComponent,
  KinkegxComponent,
  KinkegFormxComponent,
  KinkegSubxComponent,
  KinkegSubFormxComponent],
  imports: [
    CoreModule,
    SharedModule,
    KuaPpasxRoutingModule
  ]
})
export class KuaPpasxModule { }
