import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTextViewerComponent } from './simple-text-viewer.component';

describe('SimpleTextViewerComponent', () => {
  let component: SimpleTextViewerComponent;
  let fixture: ComponentFixture<SimpleTextViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SimpleTextViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SimpleTextViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
