import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layouts/layout.component';
import { getMenuResolver } from './core/helpers/getMenu.resolver';

const routes: Routes = [
  {
    path: '', redirectTo: 'landing-page', pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'main-page',
    component: LayoutComponent,
    resolve: { listMenu: getMenuResolver },
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule), canActivate: [AuthGuard]
  },
  {
    path: 'landing-page',
    loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule)
  },
  {
    path: 'activation',
    loadChildren: () => import('./activation/activation.module').then(m => m.ActivationModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
