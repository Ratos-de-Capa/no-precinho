import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})




export class PurchaseComponent {
  imageIndex: Number = 1;

  constructor(public dialog: MatDialog) {}
  
  ngOninit(): void {

  }

  // Abrir dialog
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
  }



  loremText: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed vestibulum semper velit, vitae consequat erat viverra nec. 
    Nullam vitae metus id metus suscipit feugiat. 
    In posuere tellus enim, eget gravida dui varius a. 
    Nullam ultrices tortor eget odio dapibus, vel aliquet ligula posuere. 
    Sed congue metus at commodo consectetur. 
    Integer vitae dui et tellus pharetra interdum nec non nunc.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed vestibulum semper velit, vitae consequat erat viverra nec. 
    Nullam vitae metus id metus suscipit feugiat. 
    In posuere tellus enim, eget gravida dui varius a. 
    Nullam ultrices tortor eget odio dapibus, vel aliquet ligula posuere. 
    Sed congue metus at commodo consectetur. 
    Integer vitae dui et tellus pharetra interdum nec non nunc.`;
}
