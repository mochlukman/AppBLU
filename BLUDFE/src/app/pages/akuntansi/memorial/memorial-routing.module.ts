import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'bukti-memorial',
    loadChildren: () => import('./bukti-memorial/bukti-memorial.module').then(m => m.BuktiMemorialModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'anggaran',
    loadChildren: () => import('./anggaran/anggaran.module').then(m => m.AnggaranModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'eliminasi',
    loadChildren: () => import('./eliminasi/eliminasi.module').then(m => m.EliminasiModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'penutup',
    loadChildren: () => import('./penutup/penutup.module').then(m => m.PenutupModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemorialRoutingModule { }
