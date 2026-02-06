import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { JurnalBelanjaMainComponent } from './jurnal-belanja-main/jurnal-belanja-main.component';


const routes: Routes = [
  {
    path:'',
    component: JurnalBelanjaMainComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Jurnal Belanja UP'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JurnalBelanjaRoutingModule { }
