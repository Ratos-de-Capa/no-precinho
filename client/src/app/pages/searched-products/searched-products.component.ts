import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-searched-products',
  templateUrl: './searched-products.component.html',
  styleUrls: ['./searched-products.component.scss']
})
export class SearchedProductsComponent {
  @Input() products: Product[] = [
    {
      id: 1,
      name: 'Macbook Apple Macbook Air',
      brand: 'Apple',
      price: 5722.03,
      description: 'Macbook Apple Macbook Air A2337 Apple M1 13,3" 8GB SSD 256 GB Mac OS Leitor Biométrico',
      src: 'https://i.zst.com.br/thumbs/45/28/34/1369411026.jpg'
    },
    {
      id: 2,
      name: 'Smartphone Xiaomi Redmi Note 12', 
      brand: 'Xiaomi',
      price: 1175,
      description: 'Smartphone Xiaomi Redmi Note 12 6GB RAM 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/17/18/-985316511.jpg'
    },
    {
      id: 3,
      name: 'Geladeira Brastemp BRE57AK',
      brand: 'Brastemp',
      price: 4011.15,
      description: 'Geladeira Brastemp BRE57AK Frost Free Inverse 443 Litros cor Inox',
      src: 'https://i.zst.com.br/thumbs/45/24/b/194270709.jpg'
    },
    {
      id: 4,
      name: 'Tablet Samsung Galaxy Tab S6 Lite',
      brand: 'Samsung',
      price: 1994.05,
      description: 'Tablet Samsung Galaxy Tab S6 Lite SM-P615N 64GB 4G 10,4" Android',
      src: 'https://i.zst.com.br/thumbs/45/23/35/1110566199.jpg'
    },
    {
      id: 5,
      name: 'Smartphone Xiaomi Pocophone Poco X5 5G',
      brand: 'Xiaomi',
      price: 1496.52,
      description: 'Smartphone Xiaomi Pocophone Poco X5 5G 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/1/34/-975675791.jpg'
    },
    {
      id: 6,
      name: 'Macbook Apple Macbook Air',
      brand: 'Apple',
      price: 5722.03,
      description: 'Macbook Apple Macbook Air A2337 Apple M1 13,3" 8GB SSD 256 GB Mac OS Leitor Biométrico',
      src: 'https://i.zst.com.br/thumbs/45/28/34/1369411026.jpg'
    },
    {
      id: 7,
      name: 'Smartphone Xiaomi Redmi Note 12', 
      brand: 'Xiaomi',
      price: 1175,
      description: 'Smartphone Xiaomi Redmi Note 12 6GB RAM 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/17/18/-985316511.jpg'
    },
    {
      id: 8,
      name: 'Geladeira Brastemp BRE57AK',
      brand: 'Brastemp',
      price: 4011.15,
      description: 'Geladeira Brastemp BRE57AK Frost Free Inverse 443 Litros cor Inox',
      src: 'https://i.zst.com.br/thumbs/45/24/b/194270709.jpg'
    },
    {
      id: 9,
      name: 'Tablet Samsung Galaxy Tab S6 Lite',
      brand: 'Samsung',
      price: 1994.05,
      description: 'Tablet Samsung Galaxy Tab S6 Lite SM-P615N 64GB 4G 10,4" Android',
      src: 'https://i.zst.com.br/thumbs/45/23/35/1110566199.jpg'
    },
    {
      id: 10,
      name: 'Smartphone Xiaomi Pocophone Poco X5 5G',
      brand: 'Xiaomi',
      price: 1496.52,
      description: 'Smartphone Xiaomi Pocophone Poco X5 5G 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/1/34/-975675791.jpg'
    },
    {
      id: 11,
      name: 'Macbook Apple Macbook Air',
      brand: 'Apple',
      price: 5722.03,
      description: 'Macbook Apple Macbook Air A2337 Apple M1 13,3" 8GB SSD 256 GB Mac OS Leitor Biométrico',
      src: 'https://i.zst.com.br/thumbs/45/28/34/1369411026.jpg'
    },
    {
      id: 12,
      name: 'Smartphone Xiaomi Redmi Note 12', 
      brand: 'Xiaomi',
      price: 1175,
      description: 'Smartphone Xiaomi Redmi Note 12 6GB RAM 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/17/18/-985316511.jpg'
    },
    {
      id: 13,
      name: 'Geladeira Brastemp BRE57AK',
      brand: 'Brastemp',
      price: 4011.15,
      description: 'Geladeira Brastemp BRE57AK Frost Free Inverse 443 Litros cor Inox',
      src: 'https://i.zst.com.br/thumbs/45/24/b/194270709.jpg'
    },
    {
      id: 14,
      name: 'Tablet Samsung Galaxy Tab S6 Lite',
      brand: 'Samsung',
      price: 1994.05,
      description: 'Tablet Samsung Galaxy Tab S6 Lite SM-P615N 64GB 4G 10,4" Android',
      src: 'https://i.zst.com.br/thumbs/45/23/35/1110566199.jpg'
    },
    {
      id: 15,
      name: 'Smartphone Xiaomi Pocophone Poco X5 5G',
      brand: 'Xiaomi',
      price: 1496.52,
      description: 'Smartphone Xiaomi Pocophone Poco X5 5G 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/1/34/-975675791.jpg'
    },
    {
      id: 16,
      name: 'Macbook Apple Macbook Air',
      brand: 'Apple',
      price: 5722.03,
      description: 'Macbook Apple Macbook Air A2337 Apple M1 13,3" 8GB SSD 256 GB Mac OS Leitor Biométrico',
      src: 'https://i.zst.com.br/thumbs/45/28/34/1369411026.jpg'
    },
    {
      id: 17,
      name: 'Smartphone Xiaomi Redmi Note 12', 
      brand: 'Xiaomi',
      price: 1175,
      description: 'Smartphone Xiaomi Redmi Note 12 6GB RAM 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/17/18/-985316511.jpg'
    },
    {
      id: 18,
      name: 'Geladeira Brastemp BRE57AK',
      brand: 'Brastemp',
      price: 4011.15,
      description: 'Geladeira Brastemp BRE57AK Frost Free Inverse 443 Litros cor Inox',
      src: 'https://i.zst.com.br/thumbs/45/24/b/194270709.jpg'
    },
    {
      id: 19,
      name: 'Tablet Samsung Galaxy Tab S6 Lite',
      brand: 'Samsung',
      price: 1994.05,
      description: 'Tablet Samsung Galaxy Tab S6 Lite SM-P615N 64GB 4G 10,4" Android',
      src: 'https://i.zst.com.br/thumbs/45/23/35/1110566199.jpg'
    },
    {
      id: 20,
      name: 'Smartphone Xiaomi Pocophone Poco X5 5G',
      brand: 'Xiaomi',
      price: 1496.52,
      description: 'Smartphone Xiaomi Pocophone Poco X5 5G 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/1/34/-975675791.jpg'
    },
    {
      id: 21,
      name: 'Macbook Apple Macbook Air',
      brand: 'Apple',
      price: 5722.03,
      description: 'Macbook Apple Macbook Air A2337 Apple M1 13,3" 8GB SSD 256 GB Mac OS Leitor Biométrico',
      src: 'https://i.zst.com.br/thumbs/45/28/34/1369411026.jpg'
    },
    {
      id: 22,
      name: 'Smartphone Xiaomi Redmi Note 12', 
      brand: 'Xiaomi',
      price: 1175,
      description: 'Smartphone Xiaomi Redmi Note 12 6GB RAM 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/17/18/-985316511.jpg'
    },
    {
      id: 23,
      name: 'Geladeira Brastemp BRE57AK',
      brand: 'Brastemp',
      price: 4011.15,
      description: 'Geladeira Brastemp BRE57AK Frost Free Inverse 443 Litros cor Inox',
      src: 'https://i.zst.com.br/thumbs/45/24/b/194270709.jpg'
    },
    {
      id: 24,
      name: 'Tablet Samsung Galaxy Tab S6 Lite',
      brand: 'Samsung',
      price: 1994.05,
      description: 'Tablet Samsung Galaxy Tab S6 Lite SM-P615N 64GB 4G 10,4" Android',
      src: 'https://i.zst.com.br/thumbs/45/23/35/1110566199.jpg'
    },
    {
      id: 25,
      name: 'Smartphone Xiaomi Pocophone Poco X5 5G',
      brand: 'Xiaomi',
      price: 1496.52,
      description: 'Smartphone Xiaomi Pocophone Poco X5 5G 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/1/34/-975675791.jpg'
    },
    {
      id: 26,
      name: 'Macbook Apple Macbook Air',
      brand: 'Apple',
      price: 5722.03,
      description: 'Macbook Apple Macbook Air A2337 Apple M1 13,3" 8GB SSD 256 GB Mac OS Leitor Biométrico',
      src: 'https://i.zst.com.br/thumbs/45/28/34/1369411026.jpg'
    },
    {
      id: 27,
      name: 'Smartphone Xiaomi Redmi Note 12', 
      brand: 'Xiaomi',
      price: 1175,
      description: 'Smartphone Xiaomi Redmi Note 12 6GB RAM 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/17/18/-985316511.jpg'
    },
    {
      id: 28,
      name: 'Geladeira Brastemp BRE57AK',
      brand: 'Brastemp',
      price: 4011.15,
      description: 'Geladeira Brastemp BRE57AK Frost Free Inverse 443 Litros cor Inox',
      src: 'https://i.zst.com.br/thumbs/45/24/b/194270709.jpg'
    },
    {
      id: 29,
      name: 'Tablet Samsung Galaxy Tab S6 Lite',
      brand: 'Samsung',
      price: 1994.05,
      description: 'Tablet Samsung Galaxy Tab S6 Lite SM-P615N 64GB 4G 10,4" Android',
      src: 'https://i.zst.com.br/thumbs/45/23/35/1110566199.jpg'
    },
    {
      id: 30,
      name: 'Smartphone Xiaomi Pocophone Poco X5 5G',
      brand: 'Xiaomi',
      price: 1496.52,
      description: 'Smartphone Xiaomi Pocophone Poco X5 5G 128GB Câmera Tripla',
      src: 'https://i.zst.com.br/thumbs/45/1/34/-975675791.jpg'
    }
    
  ];

  brands: string[] = ['Todos', 'Apple', 'Samsung', 'Motorola', 'Xiaomi', 'Asus', 'LG', 'Lenovo', 'Sony', 'Multilaser', 'Positivo', 'Philco', 'CCE', 'Outros'];
}

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  src: string;
}
