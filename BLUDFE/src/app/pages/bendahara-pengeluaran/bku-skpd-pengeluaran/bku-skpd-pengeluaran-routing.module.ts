import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { BkuMainPageComponent } from './bku-main-page/bku-main-page.component';


const routes: Routes = [
  {
    path: 'bku-skpd',
    component: BkuMainPageComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'BKU SKPD'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BkuSkpdPengeluaranRoutingModule { }
