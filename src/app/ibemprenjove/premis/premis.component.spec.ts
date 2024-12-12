import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PremisComponent } from './premis.component';

describe('PremisComponent', () => {
  let component: PremisComponent;
  let fixture: ComponentFixture<PremisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PremisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PremisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
