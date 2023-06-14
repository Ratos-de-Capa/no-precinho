import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchedProductsComponent } from './searched-products.component';

const routes: Routes = [
  {
    path: '',
    component: SearchedProductsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchedProductsRoutingModule { }
