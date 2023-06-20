import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseCarouselComponent } from './purchase-carousel.component';

describe('PurchaseCarouselComponent', () => {
  let component: PurchaseCarouselComponent;
  let fixture: ComponentFixture<PurchaseCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PurchaseCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
