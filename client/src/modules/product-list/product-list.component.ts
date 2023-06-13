import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  @Input() products: any[] = [
    {
      description: 'Macbook Apple Macbook Air A2337 Apple M1 13,3" 8GB SSD 256 GB Mac OS Leitor Biométrico',
      price: 5722.03,
      src: 'https://i.zst.com.br/thumbs/45/28/34/1369411026.jpg'
    },
    {
      description: 'Smartphone Xiaomi Redmi Note 12 6GB RAM 128GB Câmera Tripla',
      price: 1175,
      src: 'https://i.zst.com.br/thumbs/45/17/18/-985316511.jpg'
    },
    {
      description: 'Geladeira Brastemp BRE57AK Frost Free Inverse 443 Litros cor Inox',
      price: 4011.15,
      src: 'https://i.zst.com.br/thumbs/45/24/b/194270709.jpg'
    },
    {
      description: 'Tablet Samsung Galaxy Tab S6 Lite SM-P615N 64GB 4G 10,4" Android',
      price: 1994.05,
      src: 'https://i.zst.com.br/thumbs/45/23/35/1110566199.jpg'
    },
    {
      description: 'Smartphone Xiaomi Pocophone Poco X5 5G 128GB Câmera Tripla',
      price: 1496.52,
      src: 'https://i.zst.com.br/thumbs/45/1/34/-975675791.jpg'
    }
  ];
}
