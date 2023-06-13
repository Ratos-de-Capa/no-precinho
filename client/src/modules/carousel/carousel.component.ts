import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {
  items = [
    {
      src:'../../assets/img/car-03.png',
      type: 'img',
      title: 'Slide 1',
      description: 'Descrição do Slide 1'
    },
    {
      src:'../../assets/img/car-04.png',
      type: 'img',
      title: 'Slide 2',
      description: 'Descrição do Slide 2'
    },
    {
      src:'https://designerapp.officeapps.live.com/designerapp/Media.ashx/?id=535cf35c-c070-41b3-adb3-6727e1300269.mp4&fileToken=6bc77d2e-cb19-400f-a7fb-fa7568563c53&dcHint=EastUS',
      type: 'video',
      title: 'Slide 3',
      description: 'Descrição do Slide 3'
    }
  ];
}
