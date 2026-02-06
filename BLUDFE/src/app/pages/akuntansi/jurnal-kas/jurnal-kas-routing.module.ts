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
    path: 'belanja-up',
    loadChildren: () => import('./jurnal-belanja/jurnal-belanja.module').then(m => m.JurnalBelanjaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pengeluaran',
    loadChildren: () => import('./pengeluaran/pengeluaran.module').then(m => m.PengeluaranModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'memorial',
    loadChildren: () => import('./jurnal-memorial/jurnal-memorial.module').then(m => m.JurnalMemorialModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'pengembalian-belanja',
    loadChildren: () => import('./pengembalian-belanja/pengembalian-belanja.module').then(m => m.PengembalianBelanjaModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tagihan',
    loadChildren: () => import('./tagihan/tagihan.module').then(m => m.TagihanModule),
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JurnalKasRoutingModule { }
