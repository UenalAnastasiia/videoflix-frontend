import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoTabsComponent } from './video-tabs.component';

describe('VideoTabsComponent', () => {
  let component: VideoTabsComponent;
  let fixture: ComponentFixture<VideoTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoTabsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VideoTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
