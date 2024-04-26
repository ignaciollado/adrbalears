import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAdrBalearsComponent } from './about-adr-balears.component';

describe('AboutAdrBalearsComponent', () => {
  let component: AboutAdrBalearsComponent;
  let fixture: ComponentFixture<AboutAdrBalearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutAdrBalearsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutAdrBalearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
