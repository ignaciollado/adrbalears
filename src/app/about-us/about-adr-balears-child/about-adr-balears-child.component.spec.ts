import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutAdrBalearsChildComponent } from './about-adr-balears-child.component';

describe('AboutAdrBalearsChildComponent', () => {
  let component: AboutAdrBalearsChildComponent;
  let fixture: ComponentFixture<AboutAdrBalearsChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AboutAdrBalearsChildComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AboutAdrBalearsChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
