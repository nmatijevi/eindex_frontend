import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmationService, MessageService} from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ChartModule} from 'primeng/chart';
import { NgChartsModule } from 'ng2-charts';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import { AppComponent } from './app.component';
import { ProfesoriComponent } from './profesori/profesori.component';
import { HomeComponent } from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import { PopUpComponent } from './pop-up/pop-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, NgControl, ReactiveFormsModule} from "@angular/forms";
import { StudentiComponent } from './studenti/studenti.component';
import { PopUpStudentComponent } from './pop-up-student/pop-up-student.component';
import { CoursesComponent } from './courses/courses.component';
import { ProfesorService } from './profesori/profesori.service';
import { KolegijComponent } from './kolegij/kolegij.component';
import { EditComponent } from './edit/edit.component';
import { NgToastModule } from 'ng-angular-popup';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthExpiredInterceptor } from './interceptors/auth-expired.interceptor';
import { StudentCoursesComponent } from './student-courses/student-courses.component';
import { ForbiddenPageComponent } from './forbidden-page/forbidden-page.component';
import { PopUpCourseComponent } from './pop-up-course/pop-up-course.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxPrintModule } from 'ngx-print';
import { GradesComponent } from './grades/grades.component';
import { SetGradeComponent } from './set-grade/set-grade.component';

export function HttpLoaderFactory(http: HttpClient){
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    ProfesoriComponent,
    HomeComponent,
    PopUpComponent,
    StudentiComponent,
    PopUpStudentComponent,
    CoursesComponent,
    KolegijComponent,
    EditComponent,
    LoginComponent,
    StudentCoursesComponent,
    ForbiddenPageComponent,
    PopUpCourseComponent,
    GradesComponent,
    SetGradeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    TableModule,
    ToastModule,
    CalendarModule,
    SliderModule,
    MultiSelectModule,
    ContextMenuModule,
    DialogModule,
    ButtonModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    HttpClientModule,
    MessagesModule,
    MessageModule,
    NgToastModule,
    ReactiveFormsModule,
    ChartModule,
    NgChartsModule,
    NgxPrintModule,
    ConfirmDialogModule,
    TranslateModule.forRoot(
      {
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps:  [HttpClient]
        },
        defaultLanguage: 'hr'
      }
    )
  ],
  providers: [ProfesorService, ProfesoriComponent, CoursesComponent, StudentiComponent, MessageService, CoursesComponent, StudentCoursesComponent, ConfirmationService, KolegijComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent],
  entryComponents: [PopUpComponent]
})
export class AppModule { }
