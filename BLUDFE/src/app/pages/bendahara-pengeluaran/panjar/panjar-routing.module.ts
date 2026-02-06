import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { PanjarMainComponent } from './panjar-main/panjar-main.component';


const routes: Routes = [
  {
    path: 'panjar',
    component: PanjarMainComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Panjar'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanjarRoutingModule { }
