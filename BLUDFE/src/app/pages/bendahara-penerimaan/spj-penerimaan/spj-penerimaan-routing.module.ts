import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { SpjMainPageComponent } from './spj-main-page/spj-main-page.component';


const routes: Routes = [
  {
    path: 'spj-penerimaan',
    component: SpjMainPageComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'SPJ Penerimaan'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SPjPenerimaanRoutingModule { }
