import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Category, CategoryMenu } from 'src/models/category.model';

@Component({
  selector: 'app-categories-menu',
  templateUrl: './categories-menu.component.html',
  styleUrls: ['./categories-menu.component.scss']
})
export class CategoriesMenuComponent {

  @Input() categories: CategoryMenu[] = [];

  constructor(private router: Router) { }

  redirecToProducts(category: string): void {
    this.router.navigate(['/products'], { queryParams: { category } });
  }

}
