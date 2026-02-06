import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PembiayaanRoutingModule } from './pembiayaan-routing.module';
import { PembiayaanComponent } from './pembiayaan.component';
import { PengajuanComponent } from './pengajuan/pengajuan.component';
import { PengajuanFormComponent } from './pengajuan/pengajuan-form/pengajuan-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PengajuanDetailComponent } from './pengajuan/pengajuan-detail/pengajuan-detail.component';
import { RekeningPembiayaanComponent } from './pengajuan/pengajuan-detail/rekening-pembiayaan/rekening-pembiayaan.component';
import { RekeningPembiayaanFormComponent } from './pengajuan/pengajuan-detail/rekening-pembiayaan/rekening-pembiayaan-form/rekening-pembiayaan-form.component';
import { PengesahanComponent } from './pengesahan/pengesahan.component';
import { PengesahanFormComponent } from './pengesahan/pengesahan-form/pengesahan-form.component';
import { PengesahanDetailComponent } from './pengesahan/pengesahan-detail/pengesahan-detail.component';
import { PengesahanRekeningPembiayaanComponent } from './pengesahan/pengesahan-detail/pengesahan-rekening-pembiayaan/pengesahan-rekening-pembiayaan.component';


@NgModule({
    declarations: [
        PembiayaanComponent,
        PengajuanComponent,
        PengajuanFormComponent, PengajuanDetailComponent, RekeningPembiayaanComponent, RekeningPembiayaanFormComponent, PengesahanComponent, PengesahanFormComponent, PengesahanDetailComponent, PengesahanRekeningPembiayaanComponent
    ],
    exports: [
        RekeningPembiayaanFormComponent
    ],
    imports: [
        CoreModule,
        SharedModule,
        PembiayaanRoutingModule
    ]
})
export class PembiayaanModule { }
