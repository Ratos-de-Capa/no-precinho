import { Component } from '@angular/core';

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
}
