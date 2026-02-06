import { NgModule } from '@angular/core';
import { MappingRoutingModule } from './mapping-routing.module';
import { LoComponent } from './lo/lo.component';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'primeng/api';
import { LoPendapatanComponent } from './lo/lo-pendapatan/lo-pendapatan.component';
import { LoPendapatanRincianComponent } from './lo/lo-pendapatan/lo-pendapatan-rincian/lo-pendapatan-rincian.component';
import { LoBelanjaComponent } from './lo/lo-belanja/lo-belanja.component';
import { LoBelanjaRincianComponent } from './lo/lo-belanja/lo-belanja-rincian/lo-belanja-rincian.component';
import { LoFormComponent } from './lo/lo-form/lo-form.component';
import { UtangPiutangComponent } from './utang-piutang/utang-piutang.component';
import { UtangPiutangFormComponent } from './utang-piutang/utang-piutang-form/utang-piutang-form.component';
import { UtangComponent } from './utang-piutang/utang/utang.component';
import { UtangRincianComponent } from './utang-piutang/utang/utang-rincian/utang-rincian.component';
import { PiutangComponent } from './utang-piutang/piutang/piutang.component';
import { PiutangRincianComponent } from './utang-piutang/piutang/piutang-rincian/piutang-rincian.component';
import { AssetHutangComponent } from './asset-hutang/asset-hutang.component';
import { AsetTetapComponent } from './asset-hutang/aset-tetap/aset-tetap.component';
import { AssetHutangFormComponent } from './asset-hutang/asset-hutang-form/asset-hutang-form.component';
import { AssetTetapRincianComponent } from './asset-hutang/aset-tetap/asset-tetap-rincian/asset-tetap-rincian.component';
import { KorolariComponent } from './korolari/korolari.component';
import { AssetTetapKorolariComponent } from './korolari/asset-tetap-korolari/asset-tetap-korolari.component';
import { AssetTetapKorolariFormComponent } from './korolari/asset-tetap-korolari-form/asset-tetap-korolari-form.component';
import { AssetTetapKorolariRincianComponent } from './korolari/asset-tetap-korolari/asset-tetap-korolari-rincian/asset-tetap-korolari-rincian.component';
import { AssetTetapKorolariRekeningFormComponent } from './korolari/asset-tetap-korolari-rekening-form/asset-tetap-korolari-rekening-form.component';
import { ArusKasComponent } from './arus-kas/arus-kas.component';
import { ArusKasFormComponent } from './arus-kas/arus-kas-form/arus-kas-form.component';
import { AruskasPenerimaanComponent } from './arus-kas/aruskas-penerimaan/aruskas-penerimaan.component';
import { AruskasPenerimaanRincianComponent } from './arus-kas/aruskas-penerimaan/aruskas-penerimaan-rincian/aruskas-penerimaan-rincian.component';
import { AruskasPengeluaranComponent } from './arus-kas/aruskas-pengeluaran/aruskas-pengeluaran.component';
import { AruskasPengeluaranRincianComponent } from './arus-kas/aruskas-pengeluaran/aruskas-pengeluaran-rincian/aruskas-pengeluaran-rincian.component';
import { AruskasPembiayaanComponent } from './arus-kas/aruskas-pembiayaan/aruskas-pembiayaan.component';
import { AruskasPembiayaanRincianComponent } from './arus-kas/aruskas-pembiayaan/aruskas-pembiayaan-rincian/aruskas-pembiayaan-rincian.component';
import { KdpComponent } from './kdp/kdp.component';
import { KdpFormComponent } from './kdp/kdp-form/kdp-form.component';
import { KdpAsetTetapComponent } from './kdp/kdp-aset-tetap/kdp-aset-tetap.component';
import { KdpAsetTetapRincianComponent } from './kdp/kdp-aset-tetap/kdp-aset-tetap-rincian/kdp-aset-tetap-rincian.component';
import { MapRbaApbdComponent } from './map-rba-apbd/map-rba-apbd.component';
import { RbaPendapatanComponent } from './map-rba-apbd/rba-pendapatan/rba-pendapatan.component';
import { RbaPendapatanRincianComponent } from './map-rba-apbd/rba-pendapatan/rba-pendapatan-rincian/rba-pendapatan-rincian.component';
import { RbaPendapatanRincianFormComponent } from './map-rba-apbd/rba-pendapatan/rba-pendapatan-rincian/rba-pendapatan-rincian-form/rba-pendapatan-rincian-form.component';
import { RbaBelanjaComponent } from './map-rba-apbd/rba-belanja/rba-belanja.component';
import { RbaBelanjaRincianComponent } from './map-rba-apbd/rba-belanja/rba-belanja-rincian/rba-belanja-rincian.component';
import { RbaBelanjaRincianFormComponent } from './map-rba-apbd/rba-belanja/rba-belanja-rincian/rba-belanja-rincian-form/rba-belanja-rincian-form.component';
import { MapPendapatanApbdComponent } from './map-pendapatan-apbd/map-pendapatan-apbd.component';
import { RekeningPendapatanComponent } from './map-pendapatan-apbd/rekening-pendapatan/rekening-pendapatan.component';
import { RekeningPendapatanRincianComponent } from './map-pendapatan-apbd/rekening-pendapatan/rekening-pendapatan-rincian/rekening-pendapatan-rincian.component';
import { RekeningPendapatanRincianFormComponent } from './map-pendapatan-apbd/rekening-pendapatan/rekening-pendapatan-rincian/rekening-pendapatan-rincian-form/rekening-pendapatan-rincian-form.component';
import { MapUtangPfkComponent } from './map-utang-pfk/map-utang-pfk.component';
import { RekeningUtangComponent } from './map-utang-pfk/rekening-utang/rekening-utang.component';
import { RekeningUtangRincianComponent } from './map-utang-pfk/rekening-utang/rekening-utang-rincian/rekening-utang-rincian.component';
import { RekeningUtangRincianFormComponent } from './map-utang-pfk/rekening-utang/rekening-utang-rincian/rekening-utang-rincian-form/rekening-utang-rincian-form.component';


@NgModule({
  declarations: [
    LoComponent,
    LoPendapatanComponent,
    LoPendapatanRincianComponent,
    LoBelanjaComponent,
    LoBelanjaRincianComponent,
    LoFormComponent,
    UtangPiutangComponent,
    UtangPiutangFormComponent,
    UtangComponent,
    UtangRincianComponent,
    PiutangComponent,
    PiutangRincianComponent,
    AssetHutangComponent,
    AsetTetapComponent,
    AssetHutangFormComponent,
    AssetTetapRincianComponent,
    KorolariComponent,
    AssetTetapKorolariComponent,
    AssetTetapKorolariFormComponent,
    AssetTetapKorolariRincianComponent,
    AssetTetapKorolariRekeningFormComponent,
    ArusKasComponent,
    ArusKasFormComponent,
    AruskasPenerimaanComponent,
    AruskasPenerimaanRincianComponent,
    AruskasPengeluaranComponent,
    AruskasPengeluaranRincianComponent,
    AruskasPembiayaanComponent,
    AruskasPembiayaanRincianComponent,
    KdpComponent,
    KdpFormComponent,
    KdpAsetTetapComponent,
    KdpAsetTetapRincianComponent,
    MapRbaApbdComponent,
    RbaPendapatanComponent,
    RbaPendapatanRincianComponent,
    RbaPendapatanRincianFormComponent,
    RbaBelanjaComponent,
    RbaBelanjaRincianComponent,
    RbaBelanjaRincianFormComponent,
    MapPendapatanApbdComponent,
    RekeningPendapatanComponent,
    RekeningPendapatanRincianComponent,
    RekeningPendapatanRincianFormComponent,
    MapUtangPfkComponent,
    RekeningUtangComponent,
    RekeningUtangRincianComponent,
    RekeningUtangRincianFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    MappingRoutingModule
  ]
})
export class MappingModule { }
