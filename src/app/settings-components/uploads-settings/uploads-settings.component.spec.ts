import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadsSettingsComponent } from './uploads-settings.component';

describe('UploadsSettingsComponent', () => {
  let component: UploadsSettingsComponent;
  let fixture: ComponentFixture<UploadsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UploadsSettingsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
