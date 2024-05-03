import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmErrorComponent } from './confirm-error.component';

describe('ConfirmErrorComponent', () => {
  let component: ConfirmErrorComponent;
  let fixture: ComponentFixture<ConfirmErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmErrorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConfirmErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
