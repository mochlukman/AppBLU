import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActiveFormComponent} from 'src/app/activation/active-form/active-form.component';


const routes: Routes = [
  {
    path: '',
    component: ActiveFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActivationRoutingModule { }
