import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/models/session.interface';
import { SessionCacheService } from 'src/modules/services/session-cache.service';
import { ToastrService } from 'src/modules/toastr-module';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string;

  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private sessionCacheService: SessionCacheService
  ) {}

  get userName() {
    const session: Session = this.sessionCacheService.get('session');
    return session?.name;
  }

  ngOnInit(): void {
    this.sessionCacheService.get('session');
  }

  isAuthenticated() {
    return this.sessionCacheService.has('session');
  }

  search($event) {
    this.router.navigate(['/products'], {
      queryParams: { item: this.searchTerm },
    });
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  goToCart() {

    alert("Carrinho de compras em construção")
    return;

    if (this.isAuthenticated()) {
      this.router.navigate(['/cart']);
    } else {
      this.toastrService.info('Você precisa estar logado para acessar o carrinho');
      this.router.navigate(['/login']);
    }
  }

  goFavorites() {
    alert("Favoritos em construção")
    return;
    
    if (this.isAuthenticated()) {
      this.router.navigate(['/favorites']);
    } else {
      this.toastrService.info('Você precisa estar logado para acessar os favoritos');
      this.router.navigate(['/login']);
    }
  }
}
