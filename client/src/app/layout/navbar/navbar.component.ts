import { Component } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { LocationSelectorComponent } from 'src/modules/location-selector/location-selector.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  userLocation = {
    city: null,
    state: null
  };


  constructor(public dialog: MatDialog) {}

  // Abrir dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(LocationSelectorComponent);


    dialogRef.afterClosed().subscribe(res => {
      if(res.event == 'close'){
        return
      }
      if(res.event == 'change'){
        this.userLocation.city = res.data.city;
        this.userLocation.state = res.data.state;
        console.log(this.userLocation)
      }
      if(res.event == undefined){
        return
      }
    })

  }

  

}
