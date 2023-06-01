import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from 'src/modules/material.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutRoutingModule
  ],
  exports: [
    HeaderComponent,
    NavbarComponent,
    FooterComponent

  ]
})
export class LayoutModule { }
