import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgendaHomeComponent } from './agenda-home.component';

describe('AgendaHomeComponent', () => {
  let component: AgendaHomeComponent;
  let fixture: ComponentFixture<AgendaHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AgendaHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgendaHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
