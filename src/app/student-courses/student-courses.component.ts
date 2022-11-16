import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { CourseService } from '../courses/course.service';
import { Courses } from '../classes/courses';
import { HttpErrorResponse } from '@angular/common/http';
import { Table } from 'primeng/table';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Grades } from '../classes/grades';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-student-courses',
  templateUrl: './student-courses.component.html',
  styleUrls: ['./student-courses.component.css']
})
export class StudentCoursesComponent implements OnInit {

  courses: Courses[] = [];
  grades: Grades[] = [];
  id!: number;
  title!: string;
  loading: boolean = true;
  exam: boolean = false;
  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor(
    public userService: UserService, 
    private courseService: CourseService, 
    private router: Router, 
    private confirmationService: ConfirmationService ,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });
    this.id = this.userService!.currentUser!.id;
    this.getStudentsCourses();
    this.title = this.userService!.currentUser!.title;
    console.log(this.title);
  }

  public getStudentsCourses(): void{
    this.courseService.getStudentsCourses(this.id).subscribe(
      (response: Courses[]) => {
        this.courses = response;
        this.loading = false;
        console.log(this.courses);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getStudents(courseId: number): void{
    console.log(courseId);
    this.router.navigate(['/profesor-kolegij', courseId]);
  }

  public getGrade(courseId: number): void{
    this.courseService.getGrade(this.id, courseId).subscribe(
      (response: Grades[]) => {
        this.grades = response;
        console.log(this.grades);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  @ViewChild('dt1') dt1: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  clear(table: Table) {
    table.clear();
  }

  makePdf(){
    let DATA: any = document.getElementById('contentToConvert');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('kolegiji.pdf');
    })
  }
  confirm(courseId: number) {
    this.confirmationService.confirm({
        message: 'Jeste li sigurni da želite prijaviti ovaj ispit?',
        accept: () => {
            //Actual logic to perform a confirmation
            this.exam = true;
            console.log(courseId, this.userService.currentUser!.id, true);
            this.courseService.setExam(courseId, this.userService.currentUser!.id, true).subscribe(
              (response: void) => {
                console.log(response);
                this.toast.success({detail:"Ispit prijavljen", summary:"Uspješno ste prijavili ispit", duration:5000});
              },
              (error: HttpErrorResponse) => {
                alert(error.message);
                this.toast.error({detail:"Greška!", summary:"Nešto je pošlo po zlu!", duration:5000});
              }
            );
        }
    });
}
}
