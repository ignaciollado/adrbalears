import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransparencyListComponent } from './transparency-list.component';

describe('TransparencyListComponent', () => {
  let component: TransparencyListComponent;
  let fixture: ComponentFixture<TransparencyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TransparencyListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransparencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
