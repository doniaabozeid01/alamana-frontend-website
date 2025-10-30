import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomProductsComponent } from './random-products.component';

describe('RandomProductsComponent', () => {
  let component: RandomProductsComponent;
  let fixture: ComponentFixture<RandomProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RandomProductsComponent]
    });
    fixture = TestBed.createComponent(RandomProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
