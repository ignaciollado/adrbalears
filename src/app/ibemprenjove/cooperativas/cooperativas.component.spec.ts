import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CooperativasComponent } from './cooperativas.component';

describe('CooperativasComponent', () => {
  let component: CooperativasComponent;
  let fixture: ComponentFixture<CooperativasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CooperativasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CooperativasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
