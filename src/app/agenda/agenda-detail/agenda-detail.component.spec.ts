import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaDetailComponent } from './agenda-detail.component';

describe('AgendaDetailComponent', () => {
  let component: AgendaDetailComponent;
  let fixture: ComponentFixture<AgendaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
