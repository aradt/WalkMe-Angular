import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursesDisplayComponent } from './courses-display.component';

describe('CoursesDisplayComponent', () => {
  let component: CoursesDisplayComponent;
  let fixture: ComponentFixture<CoursesDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
