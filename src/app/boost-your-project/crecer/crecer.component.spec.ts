import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrecerComponent } from './crecer.component';

describe('CrecerComponent', () => {
  let component: CrecerComponent;
  let fixture: ComponentFixture<CrecerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CrecerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrecerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
