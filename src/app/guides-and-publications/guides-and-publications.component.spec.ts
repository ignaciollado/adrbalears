import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidesAndPublicationsComponent } from './guides-and-publications.component';

describe('GuidesAndPublicationsComponent', () => {
  let component: GuidesAndPublicationsComponent;
  let fixture: ComponentFixture<GuidesAndPublicationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GuidesAndPublicationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuidesAndPublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
