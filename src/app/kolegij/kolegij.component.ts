import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { Students } from '../classes/students';
import { CourseService } from '../courses/course.service';
import { CoursesComponent } from '../courses/courses.component';

@Component({
  selector: 'app-kolegij',
  templateUrl: './kolegij.component.html',
  styleUrls: ['./kolegij.component.css']
})
export class KolegijComponent implements OnInit {
  students: Students[] = [];
  loading: boolean = false;
  private routeSub!: Subscription;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private courseComponent: CoursesComponent
  ) { }

  ngOnInit(): void {
    
    /*this.routeSub = this.route.params.subscribe(params => {
      console.log(params['id'])
    });*/
    this.getStudentsOnCourse();
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

  @ViewChild('dt1') dt1: Table | undefined;
  applyFilterGlobal($event: any, stringVal: any) {
    this.dt1?.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }
  clear(table: Table) {
    table.clear();
  }
}
