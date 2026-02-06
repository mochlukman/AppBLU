import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { JurnalMemorialComponent } from './jurnal-memorial.component';


const routes: Routes = [
  {
    path:'',
    component: JurnalMemorialComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Memorial'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JurnalMemorialRoutingModule { }
