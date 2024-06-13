import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparencyDetailComponent } from './transparency-detail.component';

describe('TransparencyDetailComponent', () => {
  let component: TransparencyDetailComponent;
  let fixture: ComponentFixture<TransparencyDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransparencyDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransparencyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
