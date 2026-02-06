import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'manajemen-proyek',
    loadChildren: () => import('./manajemen-proyek/manajemen-proyek.module').then(m => m.ManajemenProyekModule),
    canActivate: [AuthGuard]
  },
  {
    path: 's-ppd',
    loadChildren: () => import('./spp/spp.module').then(m => m.SppModule),
    canActivate: [AuthGuard]
  },
  {
    path: 's-opd',
    loadChildren: () => import('./spm/spm.module').then(m => m.SpmModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'panjar',
    loadChildren: () => import('./panjar/panjar.module').then(m => m.PanjarModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bpk',
    loadChildren: () => import('./bpk/bpk.module').then(m => m.BpkModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pajak',
    loadChildren: () => import('./pajak/pajak.module').then(m => m.PajakModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pergeseran',
    loadChildren: () => import('./pergeseran/pergeseran.module').then(m => m.PergeseranModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pelimpahan',
    loadChildren: () => import('./pelimpahan/pelimpahan.module').then(m => m.PelimpahanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bku-skpd',
    loadChildren: () => import('./bku-skpd-pengeluaran/bku-skpd-pengeluaran.module').then(m => m.BkuSkpdPengeluaranModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spj-pengeluaran',
    loadChildren: () => import('./spj-pengeluaran/spj-pengeluaran.module').then(m => m.SpjPengeluaranModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lpj-pengeluaran',
    loadChildren: () => import('./lpj-pengeluaran/lpj-pengeluaran.module').then(m => m.LpjPengeluaranModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pengembalian',
    loadChildren: () => import('./pengembalian/pengembalian.module').then(m => m.PengembalianModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BendaharaPengeluaranRoutingModule { }
