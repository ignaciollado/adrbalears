import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmprenderComponent } from './emprender.component';

describe('EmprenderComponent', () => {
  let component: EmprenderComponent;
  let fixture: ComponentFixture<EmprenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmprenderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmprenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
