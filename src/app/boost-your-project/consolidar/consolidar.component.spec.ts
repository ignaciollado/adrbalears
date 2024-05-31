import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsolidarComponent } from './consolidar.component';

describe('ConsolidarComponent', () => {
  let component: ConsolidarComponent;
  let fixture: ComponentFixture<ConsolidarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsolidarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsolidarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
