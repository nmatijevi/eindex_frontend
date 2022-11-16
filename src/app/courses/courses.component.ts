import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Courses } from '../classes/courses';
import { PopUpCourseComponent } from '../pop-up-course/pop-up-course.component';
import { CourseService } from './course.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Courses[] = [];
  courseID!: number;

  constructor(
    private courseServices: CourseService,
    private router: Router,
    private dialogRef : NgbModal
  ) { }

  ngOnInit(): void {
    this.getCourses();
  }

  public getCourses(): void{
    this.courseServices.getCourses().subscribe(
      (response: Courses[]) => {
        this.courses = response;
        console.log(this.courses);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  openDialog(){
    this.dialogRef.open(PopUpCourseComponent);
  }
  public getId(){
    return this.courseID;
  }
  public getCurrentCourse(courseId: number){
    console.log(courseId);
    this.courseID = courseId;
    this.router.navigate(['/kolegij', courseId]);
  }
}
