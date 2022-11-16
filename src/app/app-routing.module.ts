import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { ProfesoriComponent } from "./profesori/profesori.component";
import { StudentiComponent } from './studenti/studenti.component';
import { CoursesComponent } from './courses/courses.component';
import { KolegijComponent } from './kolegij/kolegij.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './guards/auth-guard.service';
import { AdminAuthGuardService } from './guards/admin-auth-guard.service';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { GradesComponent } from './grades/grades.component';
import { SetGradeComponent } from './set-grade/set-grade.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AdminAuthGuardService] },
  { path: 'profesori', component: ProfesoriComponent, canActivate: [AdminAuthGuardService] },
  { path: 'studenti', component: StudentiComponent, canActivate: [AdminAuthGuardService] },
  { path: 'kolegiji', component: CoursesComponent, canActivate: [AdminAuthGuardService] },
  { path: 'kolegij/:id', component: KolegijComponent, canActivate: [AdminAuthGuardService]},
  { path: 'edit/:id', component: EditComponent, canActivate: [AdminAuthGuardService] },
  { path: 'upisani-kolegiji', component: StudentCoursesComponent, canActivate: [AuthGuardService] },
  { path: 'profesor-kolegij/:id', component: GradesComponent, canActivate:[AuthGuardService] },
  { path: 'ocjenjivanje/:id/:id', component: SetGradeComponent, canActivate:[AuthGuardService] },
  { path: 'forbidden', component: ForbiddenPageComponent } 
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
