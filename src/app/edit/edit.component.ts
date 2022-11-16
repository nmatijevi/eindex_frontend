import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Profesors } from '../classes/profesors';
import { Students } from '../classes/students';
import { ProfesorService } from '../profesori/profesori.service';
import { UserService } from '../user/user.service';
import { Location } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id!: number;
  profesors!: Profesors;
  form!: FormGroup;
  profesori: Profesors[] = [];

  constructor(
    private route: ActivatedRoute, 
    private userService: UserService,
    private location: Location,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
    this.getUserData();
  }


  public getUserData(){
    this.userService.getStudentsData(this.route.snapshot.params.id).subscribe(
      (response: Profesors) => {
        this.profesors = response;
        console.log(this.profesors);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onEditUser(profesori: Profesors[]): void {
    this.userService.updateUser(profesori, this.route.snapshot.params.id).subscribe(
      (response: Profesors[]) => {
        console.log(response);
        this.toast.success({detail:"Uspjeh!", summary:"Uspješno ste uredili podatke", duration:5000});
        this.location.back();
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Greška!", summary:"Nešto je pošlo po zlu!", duration:5000});
      }
    );
  }
}
