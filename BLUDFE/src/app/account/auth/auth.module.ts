import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UIModule } from '../../shared/ui/ui.module';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing';
import { ConfirmComponent } from './confirm/confirm.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import {AutoCompleteModule} from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import {FieldsetModule} from 'primeng/fieldset';
@NgModule({
  declarations: [LoginComponent, SignupComponent, ConfirmComponent, PasswordresetComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbAlertModule,
    UIModule,
    AuthRoutingModule,
    AutoCompleteModule,
    RadioButtonModule,
    FieldsetModule
  ]
})
export class AuthModule { }
