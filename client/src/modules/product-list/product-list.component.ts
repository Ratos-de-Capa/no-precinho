import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: any[] = [
    {
      name: 'Produto 1',
      description: 'Descrição do Produto 1',
      price: 19.99,
      imageUrl: 'path/to/image1.jpg'
    },
    {
      name: 'Produto 2',
      description: 'Descrição do Produto 2',
      price: 29.99,
      imageUrl: 'path/to/image2.jpg'
    },
    {
      name: 'Produto 3',
      description: 'Descrição do Produto 3',
      price: 39.99,
      imageUrl: 'path/to/image3.jpg'
    },
    {
      name: 'Produto 4',
      description: 'Descrição do Produto 4',
      price: 49.99,
      imageUrl: 'path/to/image4.jpg'
    },
    {
      name: 'Produto 4',
      description: 'Descrição do Produto 4',
      price: 49.99,
      imageUrl: 'path/to/image4.jpg'
    }
  ];
}
