import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PenyetoranRoutingModule } from './penyetoran-routing.module';
import { MainPendapatanComponent } from './main-pendapatan/main-pendapatan.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { DPengajuanComponent } from './main-pendapatan/dpengajuan/dpengajuan.component';
import { DPengajuanFormComponent } from './main-pendapatan/dpengajuan/dpengajuan-form/dpengajuan-form.component';
import { DPengajuanMainRincianComponent } from './main-pendapatan/dpengajuan/dpengajuan-main-rincian/dpengajuan-main-rincian.component';
import { DPengajuanTbpComponent } from './main-pendapatan/dpengajuan/dpengajuan-main-rincian/dpengajuan-tbp/dpengajuan-tbp.component';
import { DPengajuanRekeningComponent } from './main-pendapatan/dpengajuan/dpengajuan-main-rincian/dpengajuan-rekening/dpengajuan-rekening.component';
import { DPengajuanRekeningFormComponent } from './main-pendapatan/dpengajuan/dpengajuan-main-rincian/dpengajuan-rekening-form/dpengajuan-rekening-form.component';
import { MainPembiayaanComponent } from './main-pembiayaan/main-pembiayaan.component';
import { BPengajuanComponent } from './main-pembiayaan/bpengajuan/bpengajuan.component';
import { BPengajuanFormComponent } from './main-pembiayaan/bpengajuan/bpengajuan-form/bpengajuan-form.component';
import { BPengajuanMainRincianComponent } from './main-pembiayaan/bpengajuan/bpengajuan-main-rincian/bpengajuan-main-rincian.component';
import { BpengajuanRekeningComponent } from './main-pembiayaan/bpengajuan/bpengajuan-main-rincian/bpengajuan-rekening/bpengajuan-rekening.component';
import { BpengajuanRekeningFormComponent } from './main-pembiayaan/bpengajuan/bpengajuan-main-rincian/bpengajuan-rekening-form/bpengajuan-rekening-form.component';
import { MainStsComponent } from './main-sts/main-sts.component';
import { StsPengajuanComponent } from './main-sts/sts-pengajuan/sts-pengajuan.component';
import { StsPengajuanFormComponent } from './main-sts/sts-pengajuan/sts-pengajuan-form/sts-pengajuan-form.component';
import { StsPengajuanMainRincianComponent } from './main-sts/sts-pengajuan/sts-pengajuan-main-rincian/sts-pengajuan-main-rincian.component';
import { StsPengajuanRekeningComponent } from './main-sts/sts-pengajuan/sts-pengajuan-main-rincian/sts-pengajuan-rekening/sts-pengajuan-rekening.component';
import { StsPengajuanRekeningFormComponent } from './main-sts/sts-pengajuan/sts-pengajuan-main-rincian/sts-pengajuan-rekening-form/sts-pengajuan-rekening-form.component';
import { DpengesahanComponent } from './main-pendapatan/dpengesahan/dpengesahan.component';
import { DpengesahanFormComponent } from './main-pendapatan/dpengesahan/dpengesahan-form/dpengesahan-form.component';
import { DpengesahanMainRincianComponent } from './main-pendapatan/dpengesahan/dpengesahan-main-rincian/dpengesahan-main-rincian.component';
import { DpengesahanRekeningComponent } from './main-pendapatan/dpengesahan/dpengesahan-main-rincian/dpengesahan-rekening/dpengesahan-rekening.component';
import { DpengesahanTbpComponent } from './main-pendapatan/dpengesahan/dpengesahan-main-rincian/dpengesahan-tbp/dpengesahan-tbp.component';
import { BpengesahanComponent } from './main-pembiayaan/bpengesahan/bpengesahan.component';
import { BpengesahanFormComponent } from './main-pembiayaan/bpengesahan/bpengesahan-form/bpengesahan-form.component';
import { BpengesahanMainRincianComponent } from './main-pembiayaan/bpengesahan/bpengesahan-main-rincian/bpengesahan-main-rincian.component';
import { BpengesahanRekeningComponent } from './main-pembiayaan/bpengesahan/bpengesahan-main-rincian/bpengesahan-rekening/bpengesahan-rekening.component';
import { StsPengesahanComponent } from './main-sts/sts-pengesahan/sts-pengesahan.component';
import { StsPengesahanFormComponent } from './main-sts/sts-pengesahan/sts-pengesahan-form/sts-pengesahan-form.component';
import { StsPengesahanMainRincianComponent } from './main-sts/sts-pengesahan/sts-pengesahan-main-rincian/sts-pengesahan-main-rincian.component';
import { StsPengesahanRekeningComponent } from './main-sts/sts-pengesahan/sts-pengesahan-main-rincian/sts-pengesahan-rekening/sts-pengesahan-rekening.component';
import { MainStsPenetapanComponent } from './main-sts-penetapan/main-sts-penetapan.component';
import { StsPenetapanComponent } from './main-sts-penetapan/sts-penetapan/sts-penetapan.component';
import { StsPenetapanFormComponent } from './main-sts-penetapan/sts-penetapan/sts-penetapan-form/sts-penetapan-form.component';
import { StsPenetapanRincianComponent } from './main-sts-penetapan/sts-penetapan/sts-penetapan-rincian/sts-penetapan-rincian.component';
import { StsPenetapanRekeningComponent } from './main-sts-penetapan/sts-penetapan/sts-penetapan-rincian/sts-penetapan-rekening/sts-penetapan-rekening.component';
import { StsPenetapanRekeningFormComponent } from './main-sts-penetapan/sts-penetapan/sts-penetapan-rincian/sts-penetapan-rekening-form/sts-penetapan-rekening-form.component';
import { StsPenetapanSahComponent } from './main-sts-penetapan/sts-penetapan-sah/sts-penetapan-sah.component';
import { StsPenetapanFormSahComponent } from './main-sts-penetapan/sts-penetapan-sah/sts-penetapan-form-sah/sts-penetapan-form-sah.component';
import { StsPenetapanRincianSahComponent } from './main-sts-penetapan/sts-penetapan-sah/sts-penetapan-rincian-sah/sts-penetapan-rincian-sah.component';
import { StsPenetapanRekeningSahComponent } from './main-sts-penetapan/sts-penetapan-sah/sts-penetapan-rincian-sah/sts-penetapan-rekening-sah/sts-penetapan-rekening-sah.component';


@NgModule({
  declarations: [
    MainPendapatanComponent,
    DPengajuanComponent,
    DPengajuanFormComponent,
    DPengajuanMainRincianComponent,
    DPengajuanTbpComponent,
    DPengajuanRekeningComponent,
    DPengajuanRekeningFormComponent,
    MainPembiayaanComponent,
    BPengajuanComponent,
    BPengajuanFormComponent,
    BPengajuanMainRincianComponent,
    BpengajuanRekeningComponent,
    BpengajuanRekeningFormComponent,
    MainStsComponent,
    StsPengajuanComponent,
    StsPengajuanFormComponent,
    StsPengajuanMainRincianComponent,
    StsPengajuanRekeningComponent,
    StsPengajuanRekeningFormComponent,
    DpengesahanComponent,
    DpengesahanFormComponent,
    DpengesahanMainRincianComponent,
    DpengesahanRekeningComponent,
    DpengesahanTbpComponent,
    BpengesahanComponent,
    BpengesahanFormComponent,
    BpengesahanMainRincianComponent,
    BpengesahanRekeningComponent,
    StsPengesahanComponent,
    StsPengesahanFormComponent,
    StsPengesahanMainRincianComponent,
    StsPengesahanRekeningComponent,
    MainStsPenetapanComponent,
    StsPenetapanComponent,
    StsPenetapanFormComponent,
    StsPenetapanRincianComponent,
    StsPenetapanRekeningComponent,
    StsPenetapanRekeningFormComponent,
    StsPenetapanSahComponent,
    StsPenetapanFormSahComponent,
    StsPenetapanRincianSahComponent,
    StsPenetapanRekeningSahComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    PenyetoranRoutingModule
  ]
})
export class PenyetoranModule { }
