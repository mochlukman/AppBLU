import { NgModule } from '@angular/core';
import { PajakRoutingModule } from './pajak-routing.module';
import { CoreModule } from 'src/app/core/core.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { MainTunaiComponent } from './main-tunai/main-tunai.component';
import { MainTransferComponent } from './main-transfer/main-transfer.component';
import { TabPajakTunaiComponent } from './main-tunai/tab-pajak-tunai/tab-pajak-tunai.component';
import { TabPajakTunaiFormComponent } from './main-tunai/tab-pajak-tunai-form/tab-pajak-tunai-form.component';
import { TabPajakTunaiDetailComponent } from './main-tunai/tab-pajak-tunai-detail/tab-pajak-tunai-detail.component';
import { TabPajakTunaiDetailRincianComponent } from './main-tunai/tab-pajak-tunai-detail-rincian/tab-pajak-tunai-detail-rincian.component';
import { TabPajakTunaiDetailRincianFormComponent } from './main-tunai/tab-pajak-tunai-detail-rincian-form/tab-pajak-tunai-detail-rincian-form.component';
import { TabPajakTransferComponent } from './main-transfer/tab-pajak-transfer/tab-pajak-transfer.component';
import { TabPajakTransferDetailComponent } from './main-transfer/tab-pajak-transfer-detail/tab-pajak-transfer-detail.component';
import { TabPajakTransferDetailRincianComponent } from './main-transfer/tab-pajak-transfer-detail-rincian/tab-pajak-transfer-detail-rincian.component';
import { TabPajakTransferDetailRincianFormComponent } from './main-transfer/tab-pajak-transfer-detail-rincian-form/tab-pajak-transfer-detail-rincian-form.component';
import { TabPajakTransferFormComponent } from './main-transfer/tab-pajak-transfer-form/tab-pajak-transfer-form.component';


@NgModule({
  declarations: [MainTunaiComponent, MainTransferComponent, TabPajakTunaiComponent, TabPajakTunaiFormComponent, TabPajakTunaiDetailComponent, TabPajakTunaiDetailRincianComponent, TabPajakTunaiDetailRincianFormComponent, TabPajakTransferComponent, TabPajakTransferDetailComponent, TabPajakTransferDetailRincianComponent, TabPajakTransferDetailRincianFormComponent, TabPajakTransferFormComponent],
  imports: [
    CoreModule,
    SharedModule,
    PajakRoutingModule
  ]
})
export class PajakModule { }
