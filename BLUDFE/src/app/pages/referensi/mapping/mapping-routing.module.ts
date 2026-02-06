import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActiveGuardService } from 'src/app/core/_commonServices/can-active-guard.service';
import { ArusKasComponent } from './arus-kas/arus-kas.component';
import { AssetHutangComponent } from './asset-hutang/asset-hutang.component';
import { KorolariComponent } from './korolari/korolari.component';
import { LoComponent } from './lo/lo.component';
import { UtangPiutangComponent } from './utang-piutang/utang-piutang.component';
import {KdpComponent} from 'src/app/pages/referensi/mapping/kdp/kdp.component';
import {MapRbaApbdComponent} from 'src/app/pages/referensi/mapping/map-rba-apbd/map-rba-apbd.component';
import {MapPendapatanApbdComponent} from 'src/app/pages/referensi/mapping/map-pendapatan-apbd/map-pendapatan-apbd.component';
import {MapUtangPfkComponent} from 'src/app/pages/referensi/mapping/map-utang-pfk/map-utang-pfk.component';


const routes: Routes = [
  {
    path: 'mapping-lo',
    component: LoComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping Rekening LRA - LO'}
  },
  {
    path: 'utang-piutang',
    component: UtangPiutangComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping Rekening Utang / Piutang - LO'}
  },
  {
    path: 'aset-utang',
    component: AssetHutangComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping Rekening Aset Tetap Dengan Utang Belanja Modal'}
  },
  {
    path: 'korolari',
    component: KorolariComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping Rekening Aset Tetap Dengan Belanja Modal'}
  },
  {
    path: 'arus-kas',
    component: ArusKasComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping Rekening Arus Kas'}
  },
  {
    path: 'kdp',
    component: KdpComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping Konstruksi Dalam Pekerjaan Dengan Belanja Modal'}
  },
  {
    path: 'rbaapbd',
    component: MapRbaApbdComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping RBA APBD'}
  },
  {
    path: 'pendapatanapbd',
    component: MapPendapatanApbdComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping Pendapatan APBD'}
  },
  {
    path: 'utangpfk',
    component: MapUtangPfkComponent,
    canActivate: [CanActiveGuardService],
    data: {setTitle: 'Mapping Utang PFk'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MappingRoutingModule { }
