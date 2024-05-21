import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerNewsAgendaComponent } from './container-news-agenda.component';

describe('ContainerNewsAgendaComponent', () => {
  let component: ContainerNewsAgendaComponent;
  let fixture: ComponentFixture<ContainerNewsAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContainerNewsAgendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContainerNewsAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
