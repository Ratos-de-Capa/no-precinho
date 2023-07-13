import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { MaterialModule } from 'src/modules/styles/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfosComponent } from './infos/infos.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { ToastrModule } from 'src/modules/toastr-module/toastr.module';


@NgModule({
  declarations: [
    LoginComponent,
    InfosComponent,
    LoginFormComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forChild()
  ]
})
export class LoginModule { }
