import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { Subscription } from 'rxjs';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { UserService } from '../user/user.service';
import { ProfesoriComponent } from '../profesori/profesori.component';
import { ProfesorService } from '../profesori/profesori.service';
import { Profesors } from '../classes/profesors';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentService } from '../studenti/studenti.service';
import { Students } from '../classes/students';
import { CourseService } from '../courses/course.service';
import { Courses } from '../classes/courses';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  profesors: Profesors[] = [];
  students: Students[] = [];
  courses: Courses[] = [];
  numOfProfessors!: number;
  numOfStudents!: number;
  numOfCourses!: number;
  num!: number;

  ngOnInit(): void {
    console.log(this.userService.isRoleAdmin());
    this.getProfessors();
    this.getStudents();
    this.getCourses();
  }

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [ [ 'Profesori' ], [ 'Studenti' ], 'Kolegiji' ],
    datasets: [ {
      data: [ 5, 5, 7 ]
    } ]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [ DatalabelsPlugin ];
  constructor(private userService: UserService, private studentService: StudentService, private profesorService: ProfesorService, private courseServices: CourseService) { }

  

  public getProfessors(): void{
    this.profesorService.getProfessors().subscribe(
      (response: Profesors[]) => {
        this.profesors = response;
        this.numOfProfessors = this.profesors.length;
        console.log(this.numOfProfessors);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getStudents(): void{
    this.studentService.getStudents().subscribe(
      (response: Students[]) => {
        this.students = response;
        this.numOfStudents = this.students.length;
        console.log(this.students);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  public getCourses(): void{
    this.courseServices.getCourses().subscribe(
      (response: Courses[]) => {
        this.courses = response;
        this.numOfCourses = this.courses.length;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
