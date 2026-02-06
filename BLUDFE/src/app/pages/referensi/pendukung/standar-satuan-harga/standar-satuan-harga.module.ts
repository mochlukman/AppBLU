import { NgModule } from '@angular/core';
import { StandarSatuanHargaRoutingModule } from './standar-satuan-harga-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SshComponent } from './ssh/ssh.component';
import { SshFormComponent } from './ssh/ssh-form/ssh-form.component';
import { HspkComponent } from './hspk/hspk.component';
import { HspkFormComponent } from './hspk/hspk-form/hspk-form.component';
import { SharedSshDetailComponent } from './shared-ssh-detail/shared-ssh-detail.component';
import { SharedSshMappingRekComponent } from './shared-ssh-detail/shared-ssh-mapping-rek/shared-ssh-mapping-rek.component';
import { SharedSshMappingRekFormComponent } from './shared-ssh-detail/shared-ssh-mapping-rek/shared-ssh-mapping-rek-form/shared-ssh-mapping-rek-form.component';
import { AsbComponent } from './asb/asb.component';
import { AsbFormComponent } from './asb/asb-form/asb-form.component';
import { SbuComponent } from './sbu/sbu.component';
import { SbuFormComponent } from './sbu/sbu-form/sbu-form.component';


@NgModule({
  declarations: [
    SshComponent, 
    SshFormComponent,
    HspkComponent,
    HspkFormComponent,
    SharedSshDetailComponent,
    SharedSshMappingRekComponent,
    SharedSshMappingRekFormComponent,
    AsbComponent,
    AsbFormComponent,
    SbuComponent,
    SbuFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    StandarSatuanHargaRoutingModule
  ]
})
export class StandarSatuanHargaModule { }
