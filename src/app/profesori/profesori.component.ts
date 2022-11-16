import { Component, OnInit, ViewChild } from '@angular/core';
import { Profesors } from '../classes/profesors';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {PopUpComponent} from "../pop-up/pop-up.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import { Table } from 'primeng/table';
import { ProfesorService } from './profesori.service';
import { HttpErrorResponse } from '@angular/common/http';
import {Message} from 'primeng//api';
import {MessageService} from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { NgToastService } from 'ng-angular-popup';
import { CourseService } from '../courses/course.service';
import { studentOnCourse } from '../classes/studentOnCourse';
import { KolegijComponent } from '../kolegij/kolegij.component';

@Component({
  selector: 'app-profesori',
  templateUrl: './profesori.component.html',
  styleUrls: ['./profesori.component.css']
})
export class ProfesoriComponent implements OnInit {

  profesors: Profesors[] = [];
  editProfesors?: Profesors; 
  loading: boolean = true;
  studentOnCourse: studentOnCourse[] = [];
  numOfProfessors?: number;

  constructor(
    private dialogRef : NgbModal, 
    private profesorService: ProfesorService,
    private msgs: MessageService,
    public router: Router,
    private toast: NgToastService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private kolegijComponent: KolegijComponent
    ) { }

  openDialog(){
    this.dialogRef.open(PopUpComponent);
  }


  ngOnInit(): void {
    this.getProfessors();
  }

  public getProfessors(): void{
    this.profesorService.getProfessors().subscribe(
      (response: Profesors[]) => {
        this.profesors = response;
        this.loading = false;
        this.numOfProfessors = this.profesors.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditProfessor(profesorId: number){
    /*const ref = this.dialogRef.open(PopUpComponent);
    ref.componentInstance.selectedProfesor = profesor;*/
    this.router.navigate(['edit', profesorId]);
  }

  public onDeleteProfessor(profesorId: number): void{
    this.profesorService.deleteProfessor(profesorId).subscribe(
      (response: void) => {
        console.log(response);
        this.toast.success({detail:"Profesor izbrisan!", summary:"Uspješno ste izbrisali profesora", duration:5000});
        this.getProfessors();
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Greška!", summary:"Nešto je pošlo po zlu!", duration:5000});
      }
    );
  }
  public addStudentOnCourse(studentId: number): void{
    this.courseService.saveStudentOnCourse(studentId, this.route.snapshot.params.id).subscribe(
      (response: studentOnCourse) => {
        console.log("Profesor dodan");
        this.kolegijComponent.getStudentsOnCourse();
        this.toast.success({detail:"Profesor dodan", summary:"Uspješno ste dodali profesora na kolegij", duration:5000});
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Greška!", summary:"Odabrani student već je dodan na ovaj predmet!", duration:5000});
      }
    );
  }

  addSingle() {
    this.msgs.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
  clearMessage() {
    this.msgs.clear();
  }

  @ViewChild('dt1') dt1: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  clear(table: Table) {
    table.clear();
}
}
