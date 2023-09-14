import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { MfaComponent } from './mfa/mfa.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'mfa', component: MfaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
