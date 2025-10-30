import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManyVideosComponent } from './many-videos.component';

describe('ManyVideosComponent', () => {
  let component: ManyVideosComponent;
  let fixture: ComponentFixture<ManyVideosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManyVideosComponent]
    });
    fixture = TestBed.createComponent(ManyVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
