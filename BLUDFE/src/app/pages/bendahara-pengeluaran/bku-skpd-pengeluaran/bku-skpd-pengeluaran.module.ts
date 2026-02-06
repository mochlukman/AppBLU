import { NgModule } from '@angular/core';
import { BkuSkpdPengeluaranRoutingModule } from './bku-skpd-pengeluaran-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { BkuMainPageComponent } from './bku-main-page/bku-main-page.component';
import { BkuSkpdComponent } from './bku-skpd/bku-skpd.component';
import { BkuPelimpahanComponent } from './bku-pelimpahan/bku-pelimpahan.component';
import { BkuSp2dComponent } from './bku-sp2d/bku-sp2d.component';
import { BkuBelanjaComponent } from './bku-belanja/bku-belanja.component';
import { BkuPajakComponent } from './bku-pajak/bku-pajak.component';
import { BkuPanjarComponent } from './bku-panjar/bku-panjar.component';
import { BkuSp2dFormComponent } from './bku-sp2d/bku-sp2d-form/bku-sp2d-form.component';
import { BkuBelanjaFormComponent } from './bku-belanja/bku-belanja-form/bku-belanja-form.component';
import { BkuPelimpahanFormComponent } from './bku-pelimpahan/bku-pelimpahan-form/bku-pelimpahan-form.component';
import { BkuPanjarFormComponent } from './bku-panjar/bku-panjar-form/bku-panjar-form.component';
import { BkuPajakFormComponent } from './bku-pajak/bku-pajak-form/bku-pajak-form.component';
import { BkuPergeseranComponent } from './bku-pergeseran/bku-pergeseran.component';
import { BkuPergeseranFormComponent } from './bku-pergeseran/bku-pergeseran-form/bku-pergeseran-form.component';
import { BkuPengembalianComponent } from './bku-pengembalian/bku-pengembalian.component';
import { BkuPengembalianFormComponent } from './bku-pengembalian/bku-pengembalian-form/bku-pengembalian-form.component';


@NgModule({
  declarations: [
    BkuMainPageComponent,
    BkuSkpdComponent,
    BkuPelimpahanComponent,
    BkuSp2dComponent,
    BkuBelanjaComponent, 
    BkuPajakComponent,
    BkuPanjarComponent,
    BkuSp2dFormComponent,
    BkuBelanjaFormComponent,
    BkuPelimpahanFormComponent,
    BkuPanjarFormComponent,
    BkuPajakFormComponent,
    BkuPergeseranComponent,
    BkuPergeseranFormComponent,
    BkuPengembalianComponent,
    BkuPengembalianFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    BkuSkpdPengeluaranRoutingModule
  ]
})
export class BkuSkpdPengeluaranModule { }
