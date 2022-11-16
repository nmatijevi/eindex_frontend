import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpCourseComponent } from './pop-up-course.component';

describe('PopUpCourseComponent', () => {
  let component: PopUpCourseComponent;
  let fixture: ComponentFixture<PopUpCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
