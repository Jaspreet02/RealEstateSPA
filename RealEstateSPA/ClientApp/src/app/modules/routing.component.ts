import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/userDetail.component';
import { LandlordHeaderComponent } from '../core/header/landlord-header/landlord-header.component';
import { UpdatePasswordComponent } from './components/user/updatePassword.component';
import { AppHeaderComponent } from '../core/header/app-header/app-header.component';
import { LoginComponent } from './components/login/login.component';
import { PropertyComponent } from './components/Dashboard/Property.component';
import { AdminHeaderComponent } from '../core/header/admin-header/admin-header.component';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { RegistrationComponent } from './components/login/Registration.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/dashboard', pathMatch: 'full' },
  {
    path: 'user', component: AppHeaderComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
      { path: 'dashboard', component: DashboardComponent }
    ]
  },
  {
    path: 'admin', component: AdminHeaderComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'property', component: PropertyComponent },
      { path: 'property/:id', component: PropertyComponent },
      { path: 'users', component: UserComponent },
      { path: 'user/:id', component: UserDetailComponent },
      { path: 'user', component: UserDetailComponent },
      { path: 'changePassword', component: UpdatePasswordComponent }
    ]
  },
  {
    path: 'landlord', component: LandlordHeaderComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'property', component: PropertyComponent },
      { path: 'property/:id', component: PropertyComponent },
      { path: 'changePassword', component: UpdatePasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class RoutingModule { }
