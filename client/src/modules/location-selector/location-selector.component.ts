import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { State } from 'src/app/locationSelection/models/state';
import { City } from 'src/app/locationSelection/models/city';
import { LocationServiceService } from 'src/app/locationSelection/locationService/location-service.service';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-location-selector',
  templateUrl: './location-selector.component.html',
  styleUrls: ['./location-selector.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule,
    MatButtonModule
  ]
})
export class LocationSelectorComponent {
  constructor(private locationService: LocationServiceService, private dialogRef: MatDialogRef <LocationSelectorComponent> ) {}

  listState!: State[]
  selectedState!: State
  listCity!: City[]
  selectedCity!: City

  closeDialog(){
    this.dialogRef.close({event: 'close'}); 
  }


  applyChanges(){
    console.log(this.selectedCity);
    const newLocation = {
      city: this.selectedCity.name,
      state: this.selectedState.iso2
    }
    this.dialogRef.close({event: 'change', data: newLocation }); 
  }

  

  ngOnInit(){
    this.locationService.getStateOfSelectedCountry().subscribe(data=>{
      this.listState = data
      console.log('States Retrieved', this.listState)
    })
  }

  onStateSelected( stateparam = this.selectedState.iso2){
  this.locationService.getCitiesOfSelectedState(stateparam).subscribe(data=>{
    this.listCity = data
    console.log('Cities retrieved', this.listCity)
  })
  }


}
