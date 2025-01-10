import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLegalInfoComponent } from './show-legal-info.component';

describe('ShowLegalInfoComponent', () => {
  let component: ShowLegalInfoComponent;
  let fixture: ComponentFixture<ShowLegalInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowLegalInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowLegalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
