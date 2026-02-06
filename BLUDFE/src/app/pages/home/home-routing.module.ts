import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Dashboard'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
