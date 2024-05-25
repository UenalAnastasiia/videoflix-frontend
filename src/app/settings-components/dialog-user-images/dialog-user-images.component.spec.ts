import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUserImagesComponent } from './dialog-user-images.component';

describe('DialogUserImagesComponent', () => {
  let component: DialogUserImagesComponent;
  let fixture: ComponentFixture<DialogUserImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUserImagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUserImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
