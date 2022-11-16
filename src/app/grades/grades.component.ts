import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Table } from 'primeng/table';
import { Courses } from '../classes/courses';
import { Students } from '../classes/students';
import { CourseService } from '../courses/course.service';
import { Grades } from '../classes/grades';
import { StudentCoursesComponent } from '../student-courses/student-courses.component';
import { NgToastService } from 'ng-angular-popup';
import { pluck } from 'rxjs';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {

  students: Students[] = [];
  grades: Grades[] = [];
  loading: boolean = false;
  selectedOption!: string;
  courseId!: number;
  options = [
    { name: "1", value: 1 },
    { name: "2", value: 2 },
    { name: "3", value: 3 },
    { name: "4", value: 4 },
    { name: "5", value: 5 }
  ]

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    public studentCourse: StudentCoursesComponent,
    private toast: NgToastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getStudentsOnCourse();
    this.courseId = this.route.snapshot.params.id;
  }

  public getStudentsOnCourse(){
    const id = this.route.snapshot.paramMap.get('id');
    this.courseService.getStudentsOnCourse(this.route.snapshot.params.id).subscribe(
      (response: Students[]) => {
        this.students = response;
        this.loading = false;
        console.log(this.students);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public setGrade(studentId: number, grade: string){
    console.log(studentId, grade, this.route.snapshot.params.id);
    this.courseService.setGrade(studentId, grade, this.route.snapshot.params.id).subscribe(
      (response: Grades) => {
        console.log(response);
        this.toast.success({detail:"Ocjena dodana", summary:"Uspješno ste dodali ocjenu", duration:5000});
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        this.toast.error({detail:"Greška!", summary:"Nešto je pošlo po zlu!", duration:5000});
      }
    );
  }

  public getExam(studentId:number){
    this.courseService.getGrades(studentId, this.courseId).subscribe(
      (response: Grades[]) => {
        this.grades = response;
        console.log(this.grades);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public openGrade(studentId: number){
    this.router.navigate(['ocjenjivanje', studentId, this.route.snapshot.params.id]);
  }

  @ViewChild('dt1') dt1: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  clear(table: Table) {
    table.clear();
  }

}
