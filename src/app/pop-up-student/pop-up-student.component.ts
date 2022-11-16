import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Students } from '../classes/students';
import { StudentiComponent } from '../studenti/studenti.component';
import { StudentService } from '../studenti/studenti.service';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-pop-up-student',
  templateUrl: './pop-up-student.component.html',
  styleUrls: ['./pop-up-student.component.css'],
})
export class PopUpStudentComponent implements OnInit {
  
  public students: Students[] = [];

  constructor(
    private studentService: StudentService,
    private modalService: NgbModal,
    private studentComponent: StudentiComponent,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
  }

  public onAddStudent(addForm: NgForm): void {
    this.studentService.addStudent(addForm.value).subscribe(
      (response: Students) => {
        console.log(response);
        this.toast.success({detail:"Student dodan", summary:"Uspješno ste dodali studenta", duration:5000});
        this.studentComponent.getStudents();
        addForm.reset();
        this.modalService.dismissAll();
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Greška!", summary:"Nešto je pošlo po zlu", duration:5000});
        addForm.reset();
      }
    );
  }
}
