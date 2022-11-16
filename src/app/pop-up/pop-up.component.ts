import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Profesors } from '../classes/profesors';
import { ProfesorService } from '../profesori/profesori.service';
import { ProfesoriComponent } from '../profesori/profesori.component';
import {Message} from 'primeng//api';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { User } from '../user/user.model';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent implements OnInit {
  
  public profesors: Profesors[] = [];
  loading: boolean = true;
  public message: boolean = false;
  selectedStatus: string = '';
  
  constructor(
    private modalService: NgbModal, 
    private profesorService: ProfesorService, 
    private profesorComponent: ProfesoriComponent,
    private msgs: MessageService,
    private router: Router,
    private toast: NgToastService
    ) { }

  ngOnInit(): void {
  }


  public onAddProfessor(addForm: NgForm): void {
    console.log(addForm.value);
    this.profesorService.addProfessor(addForm.value).subscribe(
      (response: User) => {
        console.log(response);
        this.profesorComponent.getProfessors();
        this.toast.success({detail:"Profesor dodan", summary:"Uspješno ste dodali profesora", duration:5000});
        addForm.reset();
        this.modalService.dismissAll();
        
      },
      (error: HttpErrorResponse) => {
        this.toast.error({detail:"Greška!", summary:"Nešto je pošlo po zlu!", duration:5000});
        addForm.reset();
      }
    );
  }

 

  reloadComponent() {
    let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
    }

  selectChangeHandler(event: any){
    this.selectedStatus = event.target.value;
    console.log(this.selectedStatus);
  }

  addSingle() {
    this.msgs.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }
  clearMessage() {
    this.msgs.clear();
  }
}
