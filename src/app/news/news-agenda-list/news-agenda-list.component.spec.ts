import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAgendaListComponent } from './news-agenda-list.component';

describe('NewsAgendaListComponent', () => {
  let component: NewsAgendaListComponent;
  let fixture: ComponentFixture<NewsAgendaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsAgendaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsAgendaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
