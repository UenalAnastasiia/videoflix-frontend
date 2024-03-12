import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverSliderComponent } from './cover-slider.component';

describe('CoverSliderComponent', () => {
  let component: CoverSliderComponent;
  let fixture: ComponentFixture<CoverSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoverSliderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CoverSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
