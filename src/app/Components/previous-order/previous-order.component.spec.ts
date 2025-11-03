import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviousOrderComponent } from './previous-order.component';

describe('PreviousOrderComponent', () => {
  let component: PreviousOrderComponent;
  let fixture: ComponentFixture<PreviousOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PreviousOrderComponent]
    });
    fixture = TestBed.createComponent(PreviousOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
