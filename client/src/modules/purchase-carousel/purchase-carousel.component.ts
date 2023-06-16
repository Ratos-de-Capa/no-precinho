import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase-carousel',
  templateUrl: './purchase-carousel.component.html',
  styleUrls: ['./purchase-carousel.component.scss']
})
export class PurchaseCarouselComponent {
  imageIndex: Number = 1;

   // Mudar imagens
  changeImg(num: Number){
    this.imageIndex = num;
    const newImg = document.getElementById(String(this.imageIndex));
    const mainImg = document.querySelector('.mainImage img');
    document.querySelector('.active').classList.remove('active');
    newImg.parentElement.classList.add('active');
    mainImg.setAttribute('src', newImg.getAttribute('src'));
  }
}
