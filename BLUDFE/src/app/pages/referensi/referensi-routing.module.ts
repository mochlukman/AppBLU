import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'penunjang',
    loadChildren: () => import('./penunjang/penunjang.module').then(m => m.PenunjangModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pendukung',
    loadChildren: () => import('./pendukung/pendukung.module').then(m => m.PendukungModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mapping',
    loadChildren: () => import('./mapping/mapping.module').then(m => m.MappingModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferensiRoutingModule { }
