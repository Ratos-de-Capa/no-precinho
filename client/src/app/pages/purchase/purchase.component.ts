import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})




export class PurchaseComponent {
  imageIndex: Number = 1;
  constructor() {}
  
  changeImg(num: Number){
    this.imageIndex = num;
    const newImg = document.getElementById(String(this.imageIndex));
    const mainImg = document.querySelector('.mainImage img');
    document.querySelector('.active').classList.remove('active');
    newImg.parentElement.classList.add('active');
    mainImg.setAttribute('src', newImg.getAttribute('src'));
  }

  products = [
    {
      src: 'https://source.unsplash.com/5WbYFH0kf_8',
      totalPrice: 2399.00,
      installments:12,
      price: 232.33,
      store:'Loja'
    },

    {
      src: 'https://source.unsplash.com/5WbYFH0kf_8',
      totalPrice: 2321.80,
      installments: 10,
      price: 247.00,
      store:'Loja'
    },

    {
      src: 'https://source.unsplash.com/5WbYFH0kf_8',
      totalPrice:2374.05,
      installments:10,
      price: 249.90,
      store:'Loja'
    },

    {
      src: 'https://source.unsplash.com/5WbYFH0kf_8',
      totalPrice: 2459.00,
      installments:10,
      price: 245.90,
      store:'Loja'
    }
  
  ]

  ngOninit(): void {

  }

}
