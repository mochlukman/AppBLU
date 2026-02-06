import { NgModule } from '@angular/core';
import { PelaksanaanAnggaranRoutingModule } from './pelaksanaan-anggaran-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import {RadioButtonModule } from 'primeng/radiobutton';
import { SpdBelanjaComponent } from './spd/spd-belanja/spd-belanja.component';
import { SpdPembiayaanComponent } from './spd/spd-pembiayaan/spd-pembiayaan.component';
import { FormSpdbComponent } from './spd/spd-pembiayaan/spd-pembiayaan-pembuatan/form-spdb/form-spdb.component';
import { SpdBelanjPembuatanComponent } from './spd/spd-belanja/spd-belanj-pembuatan/spd-belanj-pembuatan.component';
import { FormSpdrComponent } from './spd/spd-belanja/spd-belanj-pembuatan/form-spdr/form-spdr.component';
import { SpdBelanjaDetailComponent } from './spd/spd-belanja/spd-belanj-pembuatan/spd-belanja-detail/spd-belanja-detail.component';
import { RincianSpdComponent } from './spd/spd-belanja/spd-belanj-pembuatan/spd-belanja-detail/rincian-spd/rincian-spd.component';
import { FormSpdBelanjaNilaiComponent } from './spd/spd-belanja/spd-belanj-pembuatan/form-spd-belanja-nilai/form-spd-belanja-nilai.component';
import { SpdBelanjaPengesahanComponent } from './spd/spd-belanja/spd-belanja-pengesahan/spd-belanja-pengesahan.component';
import { FormSpdrPengesahanComponent } from './spd/spd-belanja/spd-belanja-pengesahan/form-spdr-pengesahan/form-spdr-pengesahan.component';
import { SpdBelanjaDetailPengesahanComponent } from './spd/spd-belanja/spd-belanja-pengesahan/spd-belanja-detail-pengesahan/spd-belanja-detail-pengesahan.component';
import { RincianSpdPengesahanComponent } from './spd/spd-belanja/spd-belanja-pengesahan/spd-belanja-detail-pengesahan/rincian-spd-pengesahan/rincian-spd-pengesahan.component';
import { SpdPembiayaanPembuatanComponent } from './spd/spd-pembiayaan/spd-pembiayaan-pembuatan/spd-pembiayaan-pembuatan.component';
import { SpdPembiayaanPengesahanComponent } from './spd/spd-pembiayaan/spd-pembiayaan-pengesahan/spd-pembiayaan-pengesahan.component';
import { FormSpdbPengesahanComponent } from './spd/spd-pembiayaan/spd-pembiayaan-pengesahan/form-spdb-pengesahan/form-spdb-pengesahan.component';

@NgModule({
  declarations: [
    SpdBelanjaComponent,
    FormSpdrComponent,
    SpdPembiayaanComponent,
    FormSpdbComponent,
    SpdBelanjaDetailComponent,
    RincianSpdComponent,
    FormSpdBelanjaNilaiComponent,
    SpdBelanjPembuatanComponent,
    SpdBelanjaPengesahanComponent,
    FormSpdrPengesahanComponent,
    SpdBelanjaDetailPengesahanComponent,
    RincianSpdPengesahanComponent,
    SpdPembiayaanPembuatanComponent,
    SpdPembiayaanPengesahanComponent,
    FormSpdbPengesahanComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    PelaksanaanAnggaranRoutingModule,
    AutoCompleteModule,
    RadioButtonModule
  ]
})
export class PelaksanaanAnggaranModule { }
