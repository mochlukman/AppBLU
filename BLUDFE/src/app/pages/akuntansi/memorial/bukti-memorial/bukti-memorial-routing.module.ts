import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { BuktiMemorialComponent } from './bukti-memorial.component';


const routes: Routes = [
  {
    path:'',
    component: BuktiMemorialComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Bukti Memorial'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuktiMemorialRoutingModule { }
