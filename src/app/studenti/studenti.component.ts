import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Table } from 'primeng/table';
import { Students } from '../classes/students';
import { PopUpStudentComponent } from '../pop-up-student/pop-up-student.component';
import { StudentService } from './studenti.service';
import { NgToastService } from 'ng-angular-popup';
import { CourseService } from '../courses/course.service';
import { studentOnCourse } from '../classes/studentOnCourse';
import { KolegijComponent } from '../kolegij/kolegij.component';

@Component({
  selector: 'app-studenti',
  templateUrl: './studenti.component.html',
  styleUrls: ['./studenti.component.css']
})
export class StudentiComponent implements OnInit {

  students: Students[] = [];
  loading: boolean = true;
  studentID!: number;
  courseID!: number;
  studentOnCourse: studentOnCourse[] = [];

  constructor(
    private dialogRef : NgbModal, 
    private studentService: StudentService,
    public router: Router,
    public toast: NgToastService,
    public route: ActivatedRoute,
    private courseService: CourseService,
    private kolegijComponent: KolegijComponent
    ) { }

  ngOnInit(): void {
    this.getStudents();
  }
  public getStudents(): void{
    this.studentService.getStudents().subscribe(
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

  public onDeleteStudent(studentId: number): void{
    this.studentService.deleteStudent(studentId).subscribe(
      (response: void) => {
        console.log(response);
        this.toast.success({detail:"Student izbrisan!", summary:"Uspješno ste izbrisali studenta", duration:5000});
        this.getStudents();
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Greška!", summary:"Nešto je pošlo po zlu!", duration:5000});
      }
    );
  }

  public onEditStudent(profesorId: number){
    /*const ref = this.dialogRef.open(PopUpComponent);
    ref.componentInstance.selectedProfesor = profesor;*/
    this.router.navigate(['edit', profesorId]);
  }

  public addStudentOnCourse(studentId: number): void{
    this.courseService.saveStudentOnCourse(studentId, this.route.snapshot.params.id).subscribe(
      (response: studentOnCourse) => {
        console.log("Student dodan");
        this.kolegijComponent.getStudentsOnCourse();
        this.toast.success({detail:"Student dodan", summary:"Uspješno ste dodali studenta na kolegij", duration:5000});
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Greška!", summary:"Odabrani student već je dodan na ovaj predmet!", duration:5000});
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
  openDialog(){
    this.dialogRef.open(PopUpStudentComponent);
  }
}
