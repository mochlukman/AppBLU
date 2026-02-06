import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'persetujuan-tu',
    loadChildren: () => import('./persetujuan/persetujuan.module').then(m => m.PersetujuanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'spd',
    loadChildren: () => import('./sp2d/sp2d.module').then(m => m.Sp2dModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pengembalian',
    loadChildren: () => import('./pengembalian/pengembalian.module').then(m => m.PengembalianModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'sp2d-online',
    loadChildren: () => import('./sp2d-online/sp2d-online.module').then(m => m.Sp2dOnlineModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'bku-bud',
    loadChildren: () => import('./bku-bud/bku-bud.module').then(m => m.BkuBudModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BudRoutingModule { }
