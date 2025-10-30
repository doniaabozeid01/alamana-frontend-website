import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertiseSliderComponent } from './advertise-slider.component';

describe('AdvertiseSliderComponent', () => {
  let component: AdvertiseSliderComponent;
  let fixture: ComponentFixture<AdvertiseSliderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvertiseSliderComponent]
    });
    fixture = TestBed.createComponent(AdvertiseSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
