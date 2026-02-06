import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CanActiveGuardService} from 'src/app/core/_commonServices/can-active-guard.service';
import {TagihanMainComponent} from 'src/app/pages/akuntansi/jurnal-kas/tagihan/tagihan-main/tagihan-main.component';


const routes: Routes = [
  {
    path:'',
    component: TagihanMainComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'BAST Pengadaan'}
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TagihanRoutingModule { }
