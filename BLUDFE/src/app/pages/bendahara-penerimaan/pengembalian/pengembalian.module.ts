import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengembalianRoutingModule } from './pengembalian-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PendapatanComponent } from './pendapatan/pendapatan.component';
import { PendapatanPengajuanComponent } from './pendapatan/pendapatan-pengajuan/pendapatan-pengajuan.component';
import { PendapatanPengajuanFormComponent } from './pendapatan/pendapatan-pengajuan/pendapatan-pengajuan-form/pendapatan-pengajuan-form.component';
import { PendapatanPengajuanRincianComponent } from './pendapatan/pendapatan-pengajuan/pendapatan-pengajuan-rincian/pendapatan-pengajuan-rincian.component';
import { PendapatanPengajuanPembebananComponent } from './pendapatan/pendapatan-pengajuan/pendapatan-pengajuan-rincian/pendapatan-pengajuan-pembebanan/pendapatan-pengajuan-pembebanan.component';
import { PendapatanPengajuanPembebananFormComponent } from './pendapatan/pendapatan-pengajuan/pendapatan-pengajuan-rincian/pendapatan-pengajuan-pembebanan-form/pendapatan-pengajuan-pembebanan-form.component';
import { PembiayaanComponent } from './pembiayaan/pembiayaan.component';
import { PembiayaanPengajuanComponent } from './pembiayaan/pembiayaan-pengajuan/pembiayaan-pengajuan.component';
import { PembiayaanPengajuanFormComponent } from './pembiayaan/pembiayaan-pengajuan/pembiayaan-pengajuan-form/pembiayaan-pengajuan-form.component';
import { PembiayaanPengajuanRincianComponent } from './pembiayaan/pembiayaan-pengajuan/pembiayaan-pengajuan-rincian/pembiayaan-pengajuan-rincian.component';
import { PembiayaanPengajuanPembebananComponent } from './pembiayaan/pembiayaan-pengajuan/pembiayaan-pengajuan-rincian/pembiayaan-pengajuan-pembebanan/pembiayaan-pengajuan-pembebanan.component';
import { PembiayaanPengajuanPembebananFormComponent } from './pembiayaan/pembiayaan-pengajuan/pembiayaan-pengajuan-rincian/pembiayaan-pengajuan-pembebanan-form/pembiayaan-pengajuan-pembebanan-form.component';
import { PendapatanPengesahanComponent } from './pendapatan/pendapatan-pengesahan/pendapatan-pengesahan.component';
import { PendapatanPengesahanFormComponent } from './pendapatan/pendapatan-pengesahan/pendapatan-pengesahan-form/pendapatan-pengesahan-form.component';
import { PendapatanPengesahanRincianComponent } from './pendapatan/pendapatan-pengesahan/pendapatan-pengesahan-rincian/pendapatan-pengesahan-rincian.component';
import { PendapatanPengesahanPembebananComponent } from './pendapatan/pendapatan-pengesahan/pendapatan-pengesahan-rincian/pendapatan-pengesahan-pembebanan/pendapatan-pengesahan-pembebanan.component';


@NgModule({
  declarations: [
    PendapatanComponent, 
    PendapatanPengajuanComponent, 
    PendapatanPengajuanFormComponent, 
    PendapatanPengajuanRincianComponent, 
    PendapatanPengajuanPembebananComponent, 
    PendapatanPengajuanPembebananFormComponent,
    PembiayaanComponent,
    PembiayaanPengajuanComponent,
    PembiayaanPengajuanFormComponent,
    PembiayaanPengajuanRincianComponent,
    PembiayaanPengajuanPembebananComponent,
    PembiayaanPengajuanPembebananFormComponent,
    PendapatanPengesahanComponent,
    PendapatanPengesahanFormComponent,
    PendapatanPengesahanRincianComponent,
    PendapatanPengesahanPembebananComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PengembalianRoutingModule
  ]
})
export class PengembalianModule { }
