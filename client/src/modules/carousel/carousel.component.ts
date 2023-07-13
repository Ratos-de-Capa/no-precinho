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
    }
  ];

  constructor(private router: Router) { }

  redirectToList() {
    //this.router.navigate([`/list/${this.category.id}`]);
    this.router.navigate([`/product`]);
  }
}
