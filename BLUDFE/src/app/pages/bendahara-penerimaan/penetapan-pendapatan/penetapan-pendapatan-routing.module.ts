import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { MainSkpComponent } from './main-skp/main-skp.component';
import { MainSkrComponent } from './main-skr/main-skr.component';


const routes: Routes = [
  {
    path: 'skp',
    component: MainSkpComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SKP'}
  },
  {
    path: 'skr',
    component: MainSkrComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SKR'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenetapanPendapatanRoutingModule { }
