import { Component } from '@angular/core';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})




export class PurchaseComponent {
  imageIndex: Number = 1;

  constructor() {}
  
  ngOninit(): void {

  }



  loremText: string = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed vestibulum semper velit, vitae consequat erat viverra nec. 
    Nullam vitae metus id metus suscipit feugiat. 
    In posuere tellus enim, eget gravida dui varius a. 
    Nullam ultrices tortor eget odio dapibus, vel aliquet ligula posuere. 
    Sed congue metus at commodo consectetur. 
    Integer vitae dui et tellus pharetra interdum nec non nunc.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed vestibulum semper velit, vitae consequat erat viverra nec. 
    Nullam vitae metus id metus suscipit feugiat. 
    In posuere tellus enim, eget gravida dui varius a. 
    Nullam ultrices tortor eget odio dapibus, vel aliquet ligula posuere. 
    Sed congue metus at commodo consectetur. 
    Integer vitae dui et tellus pharetra interdum nec non nunc.`;
}
