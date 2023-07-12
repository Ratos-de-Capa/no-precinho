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
    this.getSimilarProducts();
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

  ngOninit(): void {
    //obter id dos parametros se existir
    //se exitr id buscar no servidor
    //se não exitr produto redirecionar ou
  }

  async getSimilarProducts() {
    try {
      const res = await this.purchaseService.getProductByCategory(
        this.product.category.category
      );

      this.relatedProducts = res;
    } catch (error) {
      console.log(error);
    }
  }

  redirectToHome() {
    this.router.navigate(['/']);
  }
}
