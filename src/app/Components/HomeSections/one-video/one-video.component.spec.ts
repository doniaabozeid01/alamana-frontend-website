import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OneVideoComponent } from './one-video.component';

describe('OneVideoComponent', () => {
  let component: OneVideoComponent;
  let fixture: ComponentFixture<OneVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneVideoComponent]
    });
    fixture = TestBed.createComponent(OneVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
