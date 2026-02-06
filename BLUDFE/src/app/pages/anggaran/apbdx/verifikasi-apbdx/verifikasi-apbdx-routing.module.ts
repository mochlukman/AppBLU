import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { MainPagexComponent } from './main-pagex/main-pagex.component';


const routes: Routes = [
  {
    path:'',
    component: MainPagexComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Verifikasi RKA / TAPD Perubahan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifikasiApbdxRoutingModule { }
