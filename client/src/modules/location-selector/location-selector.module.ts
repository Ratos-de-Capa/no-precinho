import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../styles/material.module';
import { LocationSelectorComponent } from './location-selector.component';

@NgModule({
  declarations: [LocationSelectorComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [LocationSelectorComponent],
})
export class LocationSelectorModule {}
