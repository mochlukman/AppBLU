import { NgModule } from '@angular/core';
import { PenerimaanRoutingModule } from './penerimaan-routing.module';
import { MainTanpaPenetapanComponent } from './main-tanpa-penetapan/main-tanpa-penetapan.component';
import { MainPenetapanComponent } from './main-penetapan/main-penetapan.component';
import { TanpaPenetapanComponent } from './main-tanpa-penetapan/tanpa-penetapan/tanpa-penetapan.component';
import { TanpaPenetapanFormComponent } from './main-tanpa-penetapan/tanpa-penetapan/tanpa-penetapan-form/tanpa-penetapan-form.component';
import { TanpaPenetapanMainRincianComponent } from './main-tanpa-penetapan/tanpa-penetapan/tanpa-penetapan-main-rincian/tanpa-penetapan-main-rincian.component';
import { TanpaPenetapanRincianFormComponent } from './main-tanpa-penetapan/tanpa-penetapan/tanpa-penetapan-main-rincian/tanpa-penetapan-rincian-form/tanpa-penetapan-rincian-form.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { TanpaPenetapanRincianComponent } from './main-tanpa-penetapan/tanpa-penetapan/tanpa-penetapan-main-rincian/tanpa-penetapan-rincian/tanpa-penetapan-rincian.component';
import { PenetapanComponent } from './main-penetapan/penetapan/penetapan.component';
import { PenetapanFormComponent } from './main-penetapan/penetapan/penetapan-form/penetapan-form.component';
import { PenetapanMainRincianComponent } from './main-penetapan/penetapan/penetapan-main-rincian/penetapan-main-rincian.component';
import { PenetapanRincianComponent } from './main-penetapan/penetapan/penetapan-main-rincian/penetapan-rincian/penetapan-rincian.component';
import { PenetapanRincianFormComponent } from './main-penetapan/penetapan/penetapan-main-rincian/penetapan-rincian-form/penetapan-rincian-form.component';
import { TanpaPenetapanSahComponent } from './main-tanpa-penetapan/tanpa-penetapan-sah/tanpa-penetapan-sah.component';
import { TanpaPenetapanSahFormComponent } from './main-tanpa-penetapan/tanpa-penetapan-sah/tanpa-penetapan-sah-form/tanpa-penetapan-sah-form.component';
import { TanpaPenetapanSahMainRincianComponent } from './main-tanpa-penetapan/tanpa-penetapan-sah/tanpa-penetapan-sah-main-rincian/tanpa-penetapan-sah-main-rincian.component';
import { TanpaPenetapanSahRincianComponent } from './main-tanpa-penetapan/tanpa-penetapan-sah/tanpa-penetapan-sah-main-rincian/tanpa-penetapan-sah-rincian/tanpa-penetapan-sah-rincian.component';
import { PenetapanSahComponent } from './main-penetapan/penetapan-sah/penetapan-sah.component';
import { PenetapanSahMainRincianComponent } from './main-penetapan/penetapan-sah/penetapan-sah-main-rincian/penetapan-sah-main-rincian.component';
import { PenetapanSahRincianComponent } from './main-penetapan/penetapan-sah/penetapan-sah-main-rincian/penetapan-sah-rincian/penetapan-sah-rincian.component';
import { PenetapanSahFormComponent } from './main-penetapan/penetapan-sah/penetapan-sah-form/penetapan-sah-form.component';
import { MainTbpTahunLaluComponent } from './main-tbp-tahun-lalu/main-tbp-tahun-lalu.component';
import { TbpTahunLaluComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu/tbp-tahun-lalu.component';
import { TbpTahunLaluFormComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu/tbp-tahun-lalu-form/tbp-tahun-lalu-form.component';
import { TbpTahunLaluMainRincianComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu/tbp-tahun-lalu-main-rincian/tbp-tahun-lalu-main-rincian.component';
import { TbpTahunLaluRincianComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu/tbp-tahun-lalu-main-rincian/tbp-tahun-lalu-rincian/tbp-tahun-lalu-rincian.component';
import { TbpTahunLaluRincianFormComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu/tbp-tahun-lalu-main-rincian/tbp-tahun-lalu-rincian-form/tbp-tahun-lalu-rincian-form.component';
import { TbpTahunLaluSahComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu-sah/tbp-tahun-lalu-sah.component';
import { TbpTahunLaluSahFormComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu-sah/tbp-tahun-lalu-sah-form/tbp-tahun-lalu-sah-form.component';
import { TbpTahunLaluSahMainRincianComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu-sah/tbp-tahun-lalu-sah-main-rincian/tbp-tahun-lalu-sah-main-rincian.component';
import { TbpTahunLaluSahRincianComponent } from './main-tbp-tahun-lalu/tbp-tahun-lalu-sah/tbp-tahun-lalu-sah-main-rincian/tbp-tahun-lalu-sah-rincian/tbp-tahun-lalu-sah-rincian.component';


@NgModule({
  declarations: [
    MainTanpaPenetapanComponent,
    MainPenetapanComponent,
    TanpaPenetapanComponent,
    TanpaPenetapanFormComponent,
    TanpaPenetapanMainRincianComponent,
    TanpaPenetapanRincianFormComponent,
    TanpaPenetapanRincianComponent,
    PenetapanComponent,
    PenetapanFormComponent,
    PenetapanMainRincianComponent,
    PenetapanRincianComponent,
    PenetapanRincianFormComponent,
    TanpaPenetapanSahComponent,
    TanpaPenetapanSahFormComponent,
    TanpaPenetapanSahMainRincianComponent,
    TanpaPenetapanSahRincianComponent,
    PenetapanSahComponent,
    PenetapanSahMainRincianComponent,
    PenetapanSahRincianComponent,
    PenetapanSahFormComponent,
    MainTbpTahunLaluComponent,
    TbpTahunLaluComponent,
    TbpTahunLaluFormComponent,
    TbpTahunLaluMainRincianComponent,
    TbpTahunLaluRincianComponent,
    TbpTahunLaluRincianFormComponent,
    TbpTahunLaluSahComponent,
    TbpTahunLaluSahFormComponent,
    TbpTahunLaluSahMainRincianComponent,
    TbpTahunLaluSahRincianComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PenerimaanRoutingModule
  ]
})
export class PenerimaanModule { }
