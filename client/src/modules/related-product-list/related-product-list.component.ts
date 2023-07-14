import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-related-product-list',
  templateUrl: './related-product-list.component.html',
  styleUrls: ['./related-product-list.component.scss']
})
export class RelatedProductListComponent {
   @Input() products: any
}
