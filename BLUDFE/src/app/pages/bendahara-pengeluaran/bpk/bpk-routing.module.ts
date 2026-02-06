import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { BpkKoreksiComponent } from './bpk-koreksi/bpk-koreksi.component';
import { BpkComponent } from './bpk/bpk.component';
import { SetoranPajakComponent } from './setoran-pajak/setoran-pajak.component';


const routes: Routes = [
  {
    path: 'bpk',
    component: BpkComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Belanja'}
  },
  {
    path: 'setor-pajak',
    component: SetoranPajakComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Setoran Pajak'}
  },
  {
    path: 'koreksi-belanja',
    component: BpkKoreksiComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Koreksi Belanja'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BpkRoutingModule { }
