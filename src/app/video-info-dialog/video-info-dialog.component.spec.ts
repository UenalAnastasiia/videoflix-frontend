import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoInfoDialogComponent } from './video-info-dialog.component';

describe('VideoInfoDialogComponent', () => {
  let component: VideoInfoDialogComponent;
  let fixture: ComponentFixture<VideoInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoInfoDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
