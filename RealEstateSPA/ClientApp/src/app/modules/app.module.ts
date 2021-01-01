import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { UserDetailComponent } from './components/user/userDetail.component';
import { OldLoginComponent } from './components/oldlogin/oldlogin.component';
import { LoginComponent } from './components/login/login.component';
import { UpdatePasswordComponent } from './components/user/updatePassword.component';
import { DashboardComponent } from './components/Dashboard/dashboard.component';
import { PropertyComponent } from './components/Dashboard/Property.component';
import { RegistrationComponent } from './components/login/Registration.component';

import { AccountService } from '../core/services/account.service';
import { UserService } from '../core/services/user.service';
import { PropertyService } from '../core/services/property.service';
import { CityService } from '../core/services/city.service';
import { StateService } from '../core/services/state.service';
import { MasterService } from '../core/services/master.service';
import { AddressService } from '../core/services/address.service';

import { AppHeaderComponent } from '../core/header/app-header/app-header.component';
import { UserHeaderComponent } from '../core/header/user-header/user-header.component';
import { AdminHeaderComponent } from '../core/header/admin-header/admin-header.component';
import { LandlordHeaderComponent } from '../core/header/landlord-header/landlord-header.component';

import { RoutingModule } from './routing.component';
import { AuthGuard } from '../core/guards/auth.guard';
import { AuthInterceptor } from '../core/guards/auth.interceptor';
import { FetchDataComponent } from '../fetch-data/fetch-data.component';
import { DateAgoPipe } from '../core/guards/DateAgoPipe';
import { JwPaginationComponent } from '../core/guards/JwPaginationComponent';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserDetailComponent,
    UpdatePasswordComponent,
    LoginComponent,
    OldLoginComponent,
    DashboardComponent,
    AppHeaderComponent,
    LandlordHeaderComponent,
    UserHeaderComponent,
    AdminHeaderComponent,
    PropertyComponent,
    FetchDataComponent,
    RegistrationComponent,
    DateAgoPipe,
    JwPaginationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, MasterService,AccountService,PropertyService,CityService,StateService,AddressService,AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
