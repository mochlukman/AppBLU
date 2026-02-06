import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PengembalianRoutingModule } from './pengembalian-routing.module';
import { PendapatanComponent } from './pendapatan/pendapatan.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { PendapatanPembuatanComponent } from './pendapatan/pendapatan-pembuatan/pendapatan-pembuatan.component';
import { PendapatanPembuatanFormComponent } from './pendapatan/pendapatan-pembuatan/pendapatan-pembuatan-form/pendapatan-pembuatan-form.component';
import { PendapatanPembuatanRincianComponent } from './pendapatan/pendapatan-pembuatan/pendapatan-pembuatan-rincian/pendapatan-pembuatan-rincian.component';
import { PendapatanPembuatanPembebananComponent } from './pendapatan/pendapatan-pembuatan/pendapatan-pembuatan-rincian/pendapatan-pembuatan-pembebanan/pendapatan-pembuatan-pembebanan.component';
import { PembiayaanComponent } from './pembiayaan/pembiayaan.component';
import { PembiayaanPembuatanComponent } from './pembiayaan/pembiayaan-pembuatan/pembiayaan-pembuatan.component';
import { PembiayaanPembuatanFormComponent } from './pembiayaan/pembiayaan-pembuatan/pembiayaan-pembuatan-form/pembiayaan-pembuatan-form.component';
import { PembiayaanPembuatanRincianComponent } from './pembiayaan/pembiayaan-pembuatan/pembiayaan-pembuatan-rincian/pembiayaan-pembuatan-rincian.component';
import { PembiayaanPembuatanPembebananComponent } from './pembiayaan/pembiayaan-pembuatan/pembiayaan-pembuatan-rincian/pembiayaan-pembuatan-pembebanan/pembiayaan-pembuatan-pembebanan.component';
import { PembiayaanVerifikasiComponent } from './pembiayaan/pembiayaan-verifikasi/pembiayaan-verifikasi.component';
import { PembiayaanVerifikasiFormComponent } from './pembiayaan/pembiayaan-verifikasi/pembiayaan-verifikasi-form/pembiayaan-verifikasi-form.component';
import { PembiayaanVerifikasiRincianComponent } from './pembiayaan/pembiayaan-verifikasi/pembiayaan-verifikasi-rincian/pembiayaan-verifikasi-rincian.component';
import { PembiayaanVerifikasiPembebananComponent } from './pembiayaan/pembiayaan-verifikasi/pembiayaan-verifikasi-rincian/pembiayaan-verifikasi-pembebanan/pembiayaan-verifikasi-pembebanan.component';
import { PendapatanVerifikasiComponent } from './pendapatan/pendapatan-verifikasi/pendapatan-verifikasi.component';
import { PendapatanVerifikasiFormComponent } from './pendapatan/pendapatan-verifikasi/pendapatan-verifikasi-form/pendapatan-verifikasi-form.component';
import { PendapatanVerifikasiRincianComponent } from './pendapatan/pendapatan-verifikasi/pendapatan-verifikasi-rincian/pendapatan-verifikasi-rincian.component';
import { PendapatanVerifikasiPembebananComponent } from './pendapatan/pendapatan-verifikasi/pendapatan-verifikasi-rincian/pendapatan-verifikasi-pembebanan/pendapatan-verifikasi-pembebanan.component';


@NgModule({
  declarations: [
    PendapatanComponent,
    PendapatanPembuatanComponent,
    PendapatanPembuatanFormComponent,
    PendapatanPembuatanRincianComponent,
    PendapatanPembuatanPembebananComponent,
    PembiayaanComponent,
    PembiayaanPembuatanComponent,
    PembiayaanPembuatanFormComponent,
    PembiayaanPembuatanRincianComponent,
    PembiayaanPembuatanPembebananComponent,
    PembiayaanVerifikasiComponent,
    PembiayaanVerifikasiFormComponent,
    PembiayaanVerifikasiRincianComponent,
    PembiayaanVerifikasiPembebananComponent,
    PendapatanVerifikasiComponent,
    PendapatanVerifikasiFormComponent,
    PendapatanVerifikasiRincianComponent,
    PendapatanVerifikasiPembebananComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PengembalianRoutingModule
  ]
})
export class PengembalianModule { }
