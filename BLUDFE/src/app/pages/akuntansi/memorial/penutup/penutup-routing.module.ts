import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'anggaran',
    loadChildren: () => import('./anggaran/anggaran.module').then(m => m.AnggaranModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lra',
    loadChildren: () => import('./lra/lra.module').then(m => m.LraModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'surflus-defisit-lra',
    loadChildren: () => import('./surflus/surflus.module').then(m => m.SurflusModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'lo',
    loadChildren: () => import('./lo/lo.module').then(m => m.LoModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenutupRoutingModule { }
