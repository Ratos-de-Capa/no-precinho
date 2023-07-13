import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Session } from 'src/models/session.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  searchTerm: string;

  session: Session;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ data }) => {
      this.session = data;
    });
  }

  isAuthenticated() {
    return this.session != null && this.session != undefined;
  }

  search($event) {
    console.log(this.searchTerm);
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
}
