import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { BelanjaComponent } from './belanja.component';


const routes: Routes = [
  {
    path: '',
    component: BelanjaComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengembalian Belanja'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BelanjaRoutingModule { }
