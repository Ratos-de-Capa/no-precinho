import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category, CategoryMenu } from 'src/models/category.model';
import { LocationSelectorComponent } from 'src/modules/location-selector/location-selector.component';
import { SessionCacheService } from 'src/modules/services/session-cache.service';
import { ToastrService } from 'src/modules/toastr-module';
import { NavbarService } from './navbar.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  userLocation = {
    city: null,
    state: null,
  };

  categories: CategoryMenu[] = [];

  constructor(
    public dialog: MatDialog,
    private navbarService: NavbarService,
    private toastrService: ToastrService,
    private sessionCacheService: SessionCacheService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.updateCategories();
  }

  async updateCategories(): Promise<void> {
    try {
      this.categories = await this.navbarService.listCategories();
    } catch (error) {
      this.toastrService.danger('Erro ao listar categorias');
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LocationSelectorComponent);

    dialogRef.afterClosed().subscribe((res) => {
      if (!res) {
        return;
      }

      if (res.event == 'close') {
        return;
      }
      if (res.event == 'change') {
        this.userLocation.city = res.data.city;
        this.userLocation.state = res.data.state;
        console.log(this.userLocation);
      }
    });
  }

  redirectToHistory(): void {
    if (this.sessionCacheService.has('session')) {
      this.router.navigate(['/history']);
    } else {
      this.toastrService.warning(
        'Você precisa estar logado para acessar o histórico'
      );
      this.router.navigate(['/login']);
    }
  }
}
