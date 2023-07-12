import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Publicity } from './models/publicity.model';

@Component({
  selector: 'app-publicity-card',
  templateUrl: './publicity-card.component.html',
  styleUrls: ['./publicity-card.component.scss']
})
export class PublicityCardComponent {
  @Input() publicity: Publicity;

  constructor(private router: Router) { }

  redirectToList() {
    //this.router.navigate([`/list/${this.category.id}`]);
    this.router.navigate([`/product`]);
  }

}
