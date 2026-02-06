import { NgModule } from '@angular/core';
import { SALKRoutingModule } from './salk-routing.module';
import {CoreModule} from 'src/app/core/core.module';
import {SharedModule} from 'src/app/shared/shared.module';
import { SaldoAwalNeracaComponent } from './saldo-awal-neraca/saldo-awal-neraca.component';
import { SaldoAwalNeracaFormComponent } from './saldo-awal-neraca/saldo-awal-neraca-form/saldo-awal-neraca-form.component';
import { SaldoAwalArusKasComponent } from './saldo-awal-arus-kas/saldo-awal-arus-kas.component';
import { SaldoAwalAruskasFormComponent } from './saldo-awal-arus-kas/saldo-awal-aruskas-form/saldo-awal-aruskas-form.component';


@NgModule({
  declarations: [
    SaldoAwalNeracaComponent,
    SaldoAwalNeracaFormComponent,
    SaldoAwalArusKasComponent,
    SaldoAwalAruskasFormComponent
  ],
  imports: [
    CoreModule,
    SharedModule,
    SALKRoutingModule
  ]
})
export class SALKModule { }
