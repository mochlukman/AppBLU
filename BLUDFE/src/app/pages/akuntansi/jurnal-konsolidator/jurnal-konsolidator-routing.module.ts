import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';


const routes: Routes = [
  {
    path: 'pendapatan',
    loadChildren: () => import('./pendapatan/pendapatan.module').then(m => m.PendapatanModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'belanja',
    loadChildren: () => import('./pengeluaran/pengeluaran.module').then(m => m.PengeluaranModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JurnalKonsolidatorRoutingModule { }
