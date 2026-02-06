import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MainSp2tComponent} from 'src/app/pages/bendahara-dana-bok/main-sp2t/main-sp2t.component';
import {CanActiveGuardService} from 'src/app/core/_commonServices/can-active-guard.service';
import {PergeseranComponent} from 'src/app/pages/bendahara-dana-bok/pergeseran/pergeseran/pergeseran.component';
import {BpkComponent} from 'src/app/pages/bendahara-dana-bok/bpk/bpk/bpk.component';
import {SetoranPajakComponent} from 'src/app/pages/bendahara-dana-bok/bpk/setoran-pajak/setoran-pajak.component';
import {BpkKoreksiComponent} from 'src/app/pages/bendahara-dana-bok/bpk/bpk-koreksi/bpk-koreksi.component';


const routes: Routes = [
  {
    path: 'sp2t',
    component: MainSp2tComponent,
    canActivate: [CanActiveGuardService]
  },
  {
    path: 'pergeseran/pergeseran',
    component: PergeseranComponent,
    canActivate: [CanActiveGuardService]
  },
  {
    path: 'bpk/bpk',
    component: BpkComponent,
    canActivate: [CanActiveGuardService]
  },
  {
    path: 'bpk/setor-pajak',
    component: SetoranPajakComponent,
    canActivate: [CanActiveGuardService]
  },
  {
    path: 'bpk/koreksi-belanja',
    component: BpkKoreksiComponent,
    canActivate: [CanActiveGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BendaharaDanaBokRoutingModule { }
