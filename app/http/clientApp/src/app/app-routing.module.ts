import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SuccessComponent } from './success/success.component';
import { OKTA_CONFIG, OktaAuthModule, OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';
import { HttpClientModule } from '@angular/common/http';

const oktaConfig = {
  issuer: 'https://dev-2779959.okta.com/oauth2/default',
  clientId: '0oa387444ovpApl7J5d6',
  redirectUri: window.location.origin + '/callback',
  scope: 'openid profile email'
}

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
   path: 'home',
   component: HomeComponent,
   canActivate: [OktaAuthGuard],
  },
  {
   path: 'success',
   component: SuccessComponent,
   canActivate: [OktaAuthGuard],
  },
  { path: 'callback', component: OktaCallbackComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    HttpClientModule,
    OktaAuthModule
  ],
  providers: [
   { provide: OKTA_CONFIG, useValue: oktaConfig }
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
