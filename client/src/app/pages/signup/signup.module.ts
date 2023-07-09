import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { SignupComponent } from './signup.component';
import { SignupRoutingModule } from './signup-routing.module';
import { MaterialModule } from 'src/modules/styles/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    SignupFormComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignupModule { }
