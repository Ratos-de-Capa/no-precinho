import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  searchTerm: string;

  constructor(private router: Router) { }

  search($event) {
    console.log(this.searchTerm);
    this.router.navigate(['/products'], { queryParams: { item: this.searchTerm } })
  }

}
