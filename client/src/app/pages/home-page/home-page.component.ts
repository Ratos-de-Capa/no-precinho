import { Component } from '@angular/core';
import { HomePageService } from './home-page.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  categories = [
    {
      src: '../../assets/img/pub-02.png',
      type: 'img'
    },
    {
      src: '../../assets/img/pub-03.mp4',
      type: 'video'
    }
  ];

  products;

  listProducts=[
    {
      name: 'Macbook Apple Macbook Air A2337 Apple M1 13,3" 8GB SSD 256 GB Mac OS Leitor Biométrico',
      price: 5722.03,
      coverImageSrc: 'https://i.zst.com.br/thumbs/45/28/34/1369411026.jpg',
      id: "1"
    },
    {
      name: 'Smartphone Xiaomi Redmi Note 12 6GB RAM 128GB Câmera Tripla',
      price: 1175,
      coverImageSrc: 'https://i.zst.com.br/thumbs/45/17/18/-985316511.jpg',
      id: "2"
    },
    {
      name: 'Geladeira Brastemp BRE57AK Frost Free Inverse 443 Litros cor Inox',
      price: 4011.15,
      coverImageSrc: 'https://i.zst.com.br/thumbs/45/24/b/194270709.jpg',
      id: "3"
    },
    {
      name: 'Tablet Samsung Galaxy Tab S6 Lite SM-P615N 64GB 4G 10,4" Android',
      price: 1994.05,
      coverImageSrc: 'https://i.zst.com.br/thumbs/45/23/35/1110566199.jpg',
      id: "4"
    },
    {
      name: 'Smartphone Xiaomi Pocophone Poco X5 5G 128GB Câmera Tripla',
      price: 1496.52,
      coverImageSrc: 'https://i.zst.com.br/thumbs/45/1/34/-975675791.jpg',
      id: "5"
    }
  ];


  constructor(private homeService: HomePageService){}

  ngOnInit(): void {
    this.getProducts();
  }


  async getProducts(){
    try {
      const res = await this.homeService.getProducts();
      this.products = res;
    } catch (error) {
      console.log(error);
    }
  }


}
