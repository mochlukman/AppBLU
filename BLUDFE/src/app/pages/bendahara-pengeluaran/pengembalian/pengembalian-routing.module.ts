import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'up',
    loadChildren: () => import('./up/up.module').then(m => m.UpModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'belanja',
    loadChildren: () => import('./belanja/belanja.module').then(m => m.BelanjaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pembiayaan',
    loadChildren: () => import('./pembiayaan/pembiayaan.module').then(m => m.PembiayaanModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PengembalianRoutingModule { }
