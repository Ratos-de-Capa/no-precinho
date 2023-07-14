import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PurchaseService } from './purchase.service';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss'],
})
export class PurchaseComponent implements OnInit {
  product;
  listProducts;
  id: string;
  relatedProducts: any[];

  constructor(
    private route: ActivatedRoute,
    private purchaseService: PurchaseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.init();
    });
  }

  async init() {
    await this.updateProduct();

    await this.getSimilarProducts(this.product.category.subCategory, 0, 4);
  }

  async updateProduct() {
    try {
      const res = await this.purchaseService.getProductById(this.id);

      if (!res) {
        this.redirectToHome();
        return;
      }

      this.product = res;
    } catch (error) {
      console.log(error);
    }
  }

  async getSimilarProducts(subCategory: string, skip: number, limit: number) {
    try {
      const res = await this.purchaseService.getProductsByCategory(
        subCategory,
        skip,
        limit
      );

      console.log(res);

      this.relatedProducts = res;
    } catch (error) {
      console.log(error);
    }
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
