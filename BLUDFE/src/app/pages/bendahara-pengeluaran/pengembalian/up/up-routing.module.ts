import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { UpComponent } from './up.component';


const routes: Routes = [
  {
    path: '',
    component: UpComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Pengembalian Belanja UP'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpRoutingModule { }
