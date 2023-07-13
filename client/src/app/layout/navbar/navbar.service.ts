import { Injectable } from "@angular/core";
import { Category, CategoryMenu } from "src/models/category.model";
import { ApiService } from "src/modules/services/api.service";

@Injectable({providedIn: 'root'})
export class NavbarService {
    constructor(private apiService: ApiService) {}

    async listCategories(): Promise<CategoryMenu[]> {
        return await this.apiService.get('/categories/get-categories-menu');
    }
}