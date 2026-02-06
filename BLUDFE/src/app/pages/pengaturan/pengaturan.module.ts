import { NgModule } from '@angular/core';

import { PengaturanRoutingModule } from './pengaturan-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { JabttdComponent } from './jabttd/jabttd.component';
import { FormJabttdComponent } from './jabttd/form-jabttd/form-jabttd.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RekbendComponent } from './rekbend/rekbend.component';
import { FormRekbendComponent } from './rekbend/form-rekbend/form-rekbend.component';
import { SkupComponent } from './skup/skup.component';
import { FormSkupComponent } from './skup/form-skup/form-skup.component';
import { RekkasdaComponent } from './rekkasda/rekkasda.component';
import { FormRekkasdaComponent } from './rekkasda/form-rekkasda/form-rekkasda.component';
import { JadwalTukdComponent } from './jadwal-tukd/jadwal-tukd.component';
import { FormJadwalTukdComponent } from './jadwal-tukd/form-jadwal-tukd/form-jadwal-tukd.component';
import { PenggunaComponent } from './pengguna/pengguna.component';
import { FormPenggunaComponent } from './pengguna/form-pengguna/form-pengguna.component';
import { KelolaPenggunaComponent } from './kelola-pengguna/kelola-pengguna.component';
import { FormKelolaComponent } from './kelola-pengguna/form-kelola/form-kelola.component';
import { KelolaBudComponent } from './kelola-pengguna/kelola-bud/kelola-bud.component';
import { KelolaAnggaranComponent } from './kelola-pengguna/kelola-anggaran/kelola-anggaran.component';
import { KelolaPengeluaranComponent } from './kelola-pengguna/kelola-pengeluaran/kelola-pengeluaran.component';
import { KebijakanSpdComponent } from './kebijakan-spd/kebijakan-spd.component';


@NgModule({
  declarations: [
    JabttdComponent,
    FormJabttdComponent,
    RekbendComponent,
    FormRekbendComponent,
    SkupComponent,
    FormSkupComponent,
    RekkasdaComponent,
    FormRekkasdaComponent,
    JadwalTukdComponent,
    FormJadwalTukdComponent,
    PenggunaComponent,
    FormPenggunaComponent,
    KelolaPenggunaComponent,
    FormKelolaComponent,
    KelolaBudComponent,
    KelolaAnggaranComponent,
    KelolaPengeluaranComponent,
    KebijakanSpdComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PengaturanRoutingModule
  ]
})
export class PengaturanModule { }
