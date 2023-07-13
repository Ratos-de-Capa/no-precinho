import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent {
  @ViewChild('description') description: ElementRef;

  @Input() product: Product;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    const elemento = this.description.nativeElement;
    const lineHeight = parseInt(getComputedStyle(elemento).lineHeight, 10);
    const maxHeight = lineHeight * 2;

    if (elemento.scrollHeight > maxHeight) {
      elemento.classList.add('truncate');
    }
  }

  navigateToProduct(id: string) {
    console.log('navigating to product', id);
    
    this.router.navigate(['/product', id]);
  }

  getOldPrice() {
    if (this.product.percentOff) {
      return (+this.product.price / (1 - this.product.percentOff / 100)).toFixed(
        2
      );
    }
    return null;
  }
}
