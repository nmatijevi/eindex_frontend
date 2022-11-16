import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpStudentComponent } from './pop-up-student.component';

describe('PopUpStudentComponent', () => {
  let component: PopUpStudentComponent;
  let fixture: ComponentFixture<PopUpStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopUpStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopUpStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
