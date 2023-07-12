import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @ViewChild('description') description: ElementRef;

  @Input() product: any;

  constructor(private router: Router) { }

  ngAfterViewInit() {
    const elemento = this.description.nativeElement;
    const lineHeight = parseInt(getComputedStyle(elemento).lineHeight, 10);
    const maxHeight = lineHeight * 2;

    if (elemento.scrollHeight > maxHeight) {
      elemento.classList.add('truncate');
    }
  }

  navigateToProduct(id: string) {
    this.router.navigate(['/product', id]);
  }
}
