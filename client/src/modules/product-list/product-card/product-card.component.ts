import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @ViewChild('description') description: ElementRef;

  @Input() product: any;

  ngAfterViewInit() {
    const elemento = this.description.nativeElement;
    const lineHeight = parseInt(getComputedStyle(elemento).lineHeight, 10);
    const maxHeight = lineHeight * 2;

    if (elemento.scrollHeight > maxHeight) {
      elemento.classList.add('truncate');
    }
  }
}
