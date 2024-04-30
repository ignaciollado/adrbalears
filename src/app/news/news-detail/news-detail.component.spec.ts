import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsAgendaDetailComponent } from './news-detail.component';

describe('NewsAgendaDetailComponent', () => {
  let component: NewsAgendaDetailComponent;
  let fixture: ComponentFixture<NewsAgendaDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewsAgendaDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewsAgendaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
