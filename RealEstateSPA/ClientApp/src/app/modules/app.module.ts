import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InputMaskModule } from 'primeng/inputmask';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PanelModule } from 'primeng/panel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {SpinnerModule} from 'primeng/spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {EditorModule} from 'primeng/editor';
import {GalleriaModule} from 'primeng/galleria';
import {CheckboxModule} from 'primeng/checkbox';
import {DataViewModule} from 'primeng/dataview';
import {InputNumberModule} from 'primeng/inputNumber';
import {MessageModule} from 'primeng/message';

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
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    HttpClientModule,
    PaginatorModule,
    DialogModule,
    InputMaskModule,
    InputTextModule,
    ButtonModule,
    PanelModule,
    SpinnerModule,
    BrowserAnimationsModule,
    InputSwitchModule,
    TableModule,
    MultiSelectModule,
    SliderModule,
    ConfirmDialogModule,
    EditorModule,
    GalleriaModule,
    CheckboxModule,
    DataViewModule,
    InputNumberModule,
    MessageModule
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
