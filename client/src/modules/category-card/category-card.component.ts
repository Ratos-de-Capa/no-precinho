import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  templateUrl: './category-card.component.html',
  styleUrls: ['./category-card.component.scss']
})
export class CategoryCardComponent {
  @Input() category: any

  constructor(private router: Router) { }

  redirectToList() {
    //this.router.navigate([`/list/${this.category.id}`]);
    this.router.navigate([`/product`]);
  }

}
