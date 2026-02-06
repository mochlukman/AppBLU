import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { MainPageComponent } from './main-page/main-page.component';


const routes: Routes = [
  {
    path:'',
    component: MainPageComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Verifikasi RKA / TAPD'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifikasiApbdRoutingModule { }
