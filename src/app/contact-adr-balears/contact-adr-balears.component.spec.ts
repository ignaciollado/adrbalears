import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAdrBalearsComponent } from './contact-adr-balears.component';

describe('ContactAdrBalearsComponent', () => {
  let component: ContactAdrBalearsComponent;
  let fixture: ComponentFixture<ContactAdrBalearsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactAdrBalearsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContactAdrBalearsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
