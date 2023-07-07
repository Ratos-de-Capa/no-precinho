import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-related-product-card',
  templateUrl: './related-product-card.component.html',
  styleUrls: ['./related-product-card.component.scss']
})
export class RelatedProductCardComponent {
  @Input() product: any;

  constructor(private router: Router) { }


  navigateToProduct(id: number) {
    this.router.navigate(['/product', id]);
  }

}
