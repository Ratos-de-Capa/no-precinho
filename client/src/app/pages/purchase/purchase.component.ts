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
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);

    this.updateProduct();
  }

  async init() {
    await this.updateProduct();

    this.getSimilarProducts(this.product.category.category, 0, 4);
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

  async getSimilarProducts(category: string, skip: number, limit: number) {
    try {
      const res = await this.purchaseService.getProductByCategory(category, skip, limit);

      this.relatedProducts = res;
    } catch (error) {
      console.log(error);
    }
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
