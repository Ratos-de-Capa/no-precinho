import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  items = [
    {
      src: '../../assets/img/car-03.png',
      type: 'img',
      title: 'Slide 1',
      description: 'Descrição do Slide 1'
    },
    {
      src: '../../assets/img/car-04.png',
      type: 'img',
      title: 'Slide 2',
      description: 'Descrição do Slide 2'
    },
    {
      src: 'https://designerapp.officeapps.live.com/designerapp/Media.ashx/?id=58363348-ebea-41cc-aeed-6b00b39fc2ec.mp4&fileToken=b724c7e3-57d9-454e-9bcc-8a94f7f1c5c3&dcHint=BrazilSouth',
      type: 'video',
      title: 'Slide 3',
      description: 'Descrição do Slide 3'
    }
  ];

  constructor(private router: Router) { }

  redirectToList() {
    //this.router.navigate([`/list/${this.category.id}`]);
    this.router.navigate([`/product`]);
  }
}
