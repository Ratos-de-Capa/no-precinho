import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/models/product.model';

@Component({
  selector: 'app-related-product-card',
  templateUrl: './related-product-card.component.html',
  styleUrls: ['./related-product-card.component.scss']
})
export class RelatedProductCardComponent {
  @Input() product: Product;

  constructor(private router: Router) { }


  navigateToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }

}
