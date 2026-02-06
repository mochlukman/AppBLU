import { NgModule } from '@angular/core';
import { DpaMurniRoutingModule } from './dpa-murni-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SkDpaComponent } from './sk-dpa/sk-dpa.component';
import { SkDpaPembuatanComponent } from './sk-dpa/sk-dpa-pembuatan/sk-dpa-pembuatan.component';
import { SkDpaPembuatanFormComponent } from './sk-dpa/sk-dpa-pembuatan/sk-dpa-pembuatan-form/sk-dpa-pembuatan-form.component';
import { SkDpaPengesahanComponent } from './sk-dpa/sk-dpa-pengesahan/sk-dpa-pengesahan.component';
import { SkDpaPengesahanFormComponent } from './sk-dpa/sk-dpa-pengesahan/sk-dpa-pengesahan-form/sk-dpa-pengesahan-form.component';
import { SkDpaValidasiComponent } from './sk-dpa/sk-dpa-validasi/sk-dpa-validasi.component';
import { SkDpaValidasiFormComponent } from './sk-dpa/sk-dpa-validasi/sk-dpa-validasi-form/sk-dpa-validasi-form.component';
import { BelanjaComponent } from './belanja/belanja.component';
import { FormDparComponent } from './belanja/form-dpar/form-dpar.component';
import { SkrAnggaranKasComponent } from './belanja/skr-anggaran-kas/skr-anggaran-kas.component';
import { SkrPenjabaranComponent } from './belanja/skr-penjabaran/skr-penjabaran.component';
import { SkrSumberdanaComponent } from './belanja/skr-sumberdana/skr-sumberdana.component';
import { FormKasrComponent } from './belanja/skr-anggaran-kas/form-kasr/form-kasr.component';
import { FormSkrPenjabaranComponent } from './belanja/skr-penjabaran/form-skr-penjabaran/form-skr-penjabaran.component';
import { FormSkrSumberdanaComponent } from './belanja/skr-sumberdana/form-skr-sumberdana/form-skr-sumberdana.component';
import { PembiayaanComponent } from './pembiayaan/pembiayaan.component';
import { SkbAnggaranKasComponent } from './pembiayaan/skb-anggaran-kas/skb-anggaran-kas.component';
import { SkbPenjabaranComponent } from './pembiayaan/skb-penjabaran/skb-penjabaran.component';
import { FormKasbComponent } from './pembiayaan/skb-anggaran-kas/form-kasb/form-kasb.component';
import { FormSkbPenjabaranComponent } from './pembiayaan/skb-penjabaran/form-skb-penjabaran/form-skb-penjabaran.component';
import { PendapatanComponent } from './pendapatan/pendapatan.component';
import { SkdAnggaranKasComponent } from './pendapatan/skd-anggaran-kas/skd-anggaran-kas.component';
import { SkdPenjabaranComponent } from './pendapatan/skd-penjabaran/skd-penjabaran.component';
import { FormKasdComponent } from './pendapatan/skd-anggaran-kas/form-kasd/form-kasd.component';
import { FormSkdPenjabaranComponent } from './pendapatan/skd-penjabaran/form-skd-penjabaran/form-skd-penjabaran.component';
import { FormSkrComponent } from './belanja/form-skr/form-skr.component';


@NgModule({
  declarations: [
    SkDpaComponent,
    SkDpaPembuatanComponent,
    SkDpaPembuatanFormComponent,
    SkDpaPengesahanComponent,
    SkDpaPengesahanFormComponent,
    SkDpaValidasiComponent,
    SkDpaValidasiFormComponent,
    BelanjaComponent,
    FormDparComponent,
    SkrAnggaranKasComponent,
    SkrPenjabaranComponent,
    SkrSumberdanaComponent,
    FormKasrComponent,
    FormSkrPenjabaranComponent,
    FormSkrSumberdanaComponent,
    PembiayaanComponent,
    SkbAnggaranKasComponent,
    SkbPenjabaranComponent,
    FormKasbComponent,
    FormSkbPenjabaranComponent,
    PendapatanComponent,
    SkdAnggaranKasComponent,
    SkdPenjabaranComponent,
    FormKasdComponent,
    FormSkdPenjabaranComponent,
    FormSkrComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    AutoCompleteModule,
    RadioButtonModule,
    DpaMurniRoutingModule
  ]
})
export class DpaMurniModule { }
