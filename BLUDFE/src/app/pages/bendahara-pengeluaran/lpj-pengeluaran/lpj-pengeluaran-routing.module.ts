import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { LpjMainPageComponent } from './lpj-main-page/lpj-main-page.component';


const routes: Routes = [
  {
    path: 'lpj-pengeluaran',
    component: LpjMainPageComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'LPJ Pengeluaran'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LpjPengeluaranRoutingModule { }
