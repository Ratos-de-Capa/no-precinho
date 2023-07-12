import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-path',
  templateUrl: './product-path.component.html',
  styleUrls: ['./product-path.component.scss']
})
export class ProductPathComponent {
  constructor(public dialog: MatDialog, private router: Router) {}
  @Input() product: any;


  ngOnInit(){
    console.log(this.product);
    
  }
   // Abrir dialog
   openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent);
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }

  redirectToPage(path: string){
    this.router.navigate(['/products'], { queryParams: { item: path.toLowerCase() } });
  }
}
