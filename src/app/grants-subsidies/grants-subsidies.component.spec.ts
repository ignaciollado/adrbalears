import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantsSubsidiesComponent } from './grants-subsidies.component';

describe('GrantsSubsidiesComponent', () => {
  let component: GrantsSubsidiesComponent;
  let fixture: ComponentFixture<GrantsSubsidiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GrantsSubsidiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GrantsSubsidiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
