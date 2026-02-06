import { NgModule } from '@angular/core';
import { PenunjangRoutingModule } from './penunjang-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { GolonganComponent } from './golongan/golongan.component';
import { IndikatorKinerjaComponent } from './indikator-kinerja/indikator-kinerja.component';
import { PegawaiComponent } from './pegawai/pegawai.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PegawaiFormComponent } from './pegawai/pegawai-form/pegawai-form.component';
import { JenisPajakComponent } from './jenis-pajak/jenis-pajak.component';
import { JenisPajakFormComponent } from './jenis-pajak/jenis-pajak-form/jenis-pajak-form.component';
import { TahapanComponent } from './tahapan/tahapan.component';
import { TahapanFormComponent } from './tahapan/tahapan-form/tahapan-form.component';


@NgModule({
    declarations: [
        GolonganComponent,
        IndikatorKinerjaComponent,
        PegawaiComponent,
        PegawaiFormComponent,
        JenisPajakComponent,
        JenisPajakFormComponent,
        TahapanComponent,
        TahapanFormComponent
    ],
    exports: [
        PegawaiComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        PenunjangRoutingModule
    ]
})
export class PenunjangModule { }
