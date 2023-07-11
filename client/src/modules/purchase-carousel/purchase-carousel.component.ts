import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-purchase-carousel',
  templateUrl: './purchase-carousel.component.html',
  styleUrls: ['./purchase-carousel.component.scss'],
})




export class PurchaseCarouselComponent {
  @Input() product;

  carousel= [];
  temp;

  ngOnInit() {
    this.temp = this.product.imagesSrc.map((img)=> img)
    for(let img in this.temp){
    
      this.carousel[img] ={
        image: this.temp[img],
        thumbImage: this.temp[img]
      }
    }

  }


  changeImg(event){
    this.product.coverImageSrc= this.product.imagesSrc[event]
  }

}
