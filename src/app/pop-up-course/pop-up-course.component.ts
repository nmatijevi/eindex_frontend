import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgToastService } from 'ng-angular-popup';
import { Courses } from '../classes/courses';
import { CourseService } from '../courses/course.service';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-pop-up-course',
  templateUrl: './pop-up-course.component.html',
  styleUrls: ['./pop-up-course.component.css']
})
export class PopUpCourseComponent implements OnInit {

  courses: Courses[] = [];

  constructor(
    private courseService: CourseService,
    private toast: NgToastService,
    private modalService: NgbModal,
    private courseComponent: CoursesComponent

  ) { }

  ngOnInit(): void {
  }

  public onAddCourse(addForm: NgForm): void {
    this.courseService.addCourse(addForm.value).subscribe(
      (response: Courses) => {
        console.log(response);
        this.toast.success({detail:"Kolegij dodan", summary:"Uspješno ste dodali kolegij", duration:5000});
        addForm.reset();
        this.modalService.dismissAll();
        this.courseComponent.getCourses();
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Greška!", summary:"Nešto je pošlo po zlu!", duration:5000});
        addForm.reset();
      }
    );
  }

}
