import { NgModule } from '@angular/core';

import { ManajemenProyekRoutingModule } from './manajemen-proyek-routing.module';
import { RekananComponent } from './rekanan/rekanan.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormRekenanComponent } from './rekanan/form-rekenan/form-rekenan.component';
import { KontrakComponent } from './kontrak/kontrak.component';
import { FormKontrakComponent } from './kontrak/form-kontrak/form-kontrak.component';
import { TagihanComponent } from './tagihan/tagihan.component';
import { KontrakDetailComponent } from './kontrak/kontrak-detail/kontrak-detail.component';
import { FormKontrakDetailComponent } from './kontrak/kontrak-detail/form-kontrak-detail/form-kontrak-detail.component';
import { AdendumComponent } from './adendum/adendum.component';
import { FormAdendumComponent } from './adendum/form-adendum/form-adendum.component';
import { TagihanPembuatanComponent } from './tagihan/tagihan-pembuatan/tagihan-pembuatan.component';
import { TagihanPembuatanFormComponent } from './tagihan/tagihan-pembuatan/tagihan-pembuatan-form/tagihan-pembuatan-form.component';
import { TagihanPembuatanDetailComponent } from './tagihan/tagihan-pembuatan/tagihan-pembuatan-detail/tagihan-pembuatan-detail.component';
import { TagihanPembuatanDetailFormComponent } from './tagihan/tagihan-pembuatan/tagihan-pembuatan-detail/tagihan-pembuatan-detail-form/tagihan-pembuatan-detail-form.component';
import { TagihanPengesahanComponent } from './tagihan/tagihan-pengesahan/tagihan-pengesahan.component';
import { TagihanPengesahanFormComponent } from './tagihan/tagihan-pengesahan/tagihan-pengesahan-form/tagihan-pengesahan-form.component';
import { TagihanPengesahanDetailComponent } from './tagihan/tagihan-pengesahan/tagihan-pengesahan-detail/tagihan-pengesahan-detail.component';


@NgModule({
  declarations: [
    RekananComponent,
    FormRekenanComponent,
    KontrakComponent,
    FormKontrakComponent,
    TagihanComponent,
    KontrakDetailComponent,
    FormKontrakDetailComponent,
    AdendumComponent,
    FormAdendumComponent,
    TagihanPembuatanComponent,
    TagihanPembuatanFormComponent,
    TagihanPembuatanDetailComponent,
    TagihanPembuatanDetailFormComponent,
    TagihanPengesahanComponent,
    TagihanPengesahanFormComponent,
    TagihanPengesahanDetailComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    ManajemenProyekRoutingModule,
  ]
})
export class ManajemenProyekModule { }
