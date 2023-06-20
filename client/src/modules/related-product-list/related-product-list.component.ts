import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-related-product-list',
  templateUrl: './related-product-list.component.html',
  styleUrls: ['./related-product-list.component.scss']
})
export class RelatedProductListComponent {
  @Input() products: any[] = [
    {
      src: 'https://source.unsplash.com/5WbYFH0kf_8',
      totalPrice: 2399.00,
      installments:12,
      price: 232.33,
      store:'Loja'
    },

    {
      src: 'https://source.unsplash.com/5WbYFH0kf_8',
      totalPrice: 2321.80,
      installments: 10,
      price: 247.00,
      store:'Loja'
    },

    {
      src: 'https://source.unsplash.com/5WbYFH0kf_8',
      totalPrice:2374.05,
      installments:10,
      price: 249.90,
      store:'Loja'
    },

    {
      src: 'https://source.unsplash.com/5WbYFH0kf_8',
      totalPrice: 2459.00,
      installments:10,
      price: 245.90,
      store:'Loja'
    }
  
  ]
}
