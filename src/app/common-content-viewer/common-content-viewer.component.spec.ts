import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonContentViewerComponent } from './common-content-viewer.component';

describe('CommonContentViewerComponent', () => {
  let component: CommonContentViewerComponent;
  let fixture: ComponentFixture<CommonContentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonContentViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CommonContentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
