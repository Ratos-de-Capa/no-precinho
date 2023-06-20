import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-path',
  templateUrl: './product-path.component.html',
  styleUrls: ['./product-path.component.scss']
})
export class ProductPathComponent {
  constructor(public dialog: MatDialog, private router: Router) {}


   // Abrir dialog
   openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
  }

  redirectToHome() {
    this.router.navigate([`/`]);
  }
}
