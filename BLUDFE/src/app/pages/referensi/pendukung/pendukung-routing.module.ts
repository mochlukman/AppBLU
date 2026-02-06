import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { AkunComponent } from './akun/akun.component';
import { DaftarBarangComponent } from './daftar-barang/daftar-barang.component';
import { ProgramKegiatanComponent } from './program-kegiatan/program-kegiatan.component';
import { UnitsComponent } from './units/units.component';
import { UrusanComponent } from './urusan/urusan.component';
import {KepalaOpdComponent} from 'src/app/pages/referensi/pendukung/kepala-opd/kepala-opd.component';
import {PpkBludComponent} from 'src/app/pages/referensi/pendukung/ppk-blud/ppk-blud.component';
import {DaftarBankComponent} from 'src/app/pages/referensi/pendukung/daftar-bank/daftar-bank.component';
import {ArusKasComponent} from 'src/app/pages/referensi/pendukung/arus-kas/arus-kas.component';


const routes: Routes = [
  {
    path: 'urusan',
    component: UrusanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Urusan'}
  },
  {
    path: 'unit-organisasi',
    component: UnitsComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Unit Organisasi'}
  },
  {
    path: 'program-kegiatan',
    component: ProgramKegiatanComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Program Kegiatan'}
  },
  {
    path: 'akun',
    component: AkunComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Akun'}
  },
  {
    path: 'daftar-barang',
    component: DaftarBarangComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Daftar Barang'}
  },
  {
    path: 'kaopd',
    component: KepalaOpdComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Kepala OPD'}
  },
  {
    path: 'ppkblud',
    component: PpkBludComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'PPK BLUD'}
  },
  {
    path: 'standar-satuan-harga',
    loadChildren: () => import('./standar-satuan-harga/standar-satuan-harga.module').then(m => m.StandarSatuanHargaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'daftar-bank',
    component: DaftarBankComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Daftar Bank'}
  },
  {
    path: 'arus-kas',
    component: ArusKasComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Arus Kas'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendukungRoutingModule { }
