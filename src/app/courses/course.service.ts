import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Courses } from '../classes/courses';
import { Grades } from '../classes/grades';
import { Profesors } from '../classes/profesors';
import { studentOnCourse } from '../classes/studentOnCourse';
import { Students } from '../classes/students';


@Injectable({
    providedIn: 'root'
})
export class CourseService {
    private apiServerUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getCourses(): Observable<Courses[]>{
        return this.http.get<Courses[]>(`${this.apiServerUrl}/kolegiji`);
    }

    public getStudentsOnCourse(courseId: number): Observable<Students[]>{
        console.log(courseId);
        return this.http.get<Students[]>(`${this.apiServerUrl}/api/user/kolegij/${courseId}`);
    }

    public saveStudentOnCourse(courseId: number, userId: number): Observable<studentOnCourse> {
        return this.http.post<studentOnCourse>(`${this.apiServerUrl}/api/user/addStudent/${userId}/${courseId}`, {observe: 'response'});
    }

    public addCourse(course: Courses): Observable<Courses>{
        console.log(course);
        return this.http.post<Courses>(`${this.apiServerUrl}/kolegiji/addCourse`, course);
    }

    public getStudentsCourses(studentId: number): Observable<Courses[]>{
        return this.http.get<Courses[]>(`${this.apiServerUrl}/kolegiji/upisani-kolegiji/${studentId}`);
    }
    
    public setGrade(studentId: number, grade: string, courseId: number): Observable<Grades>{
        return this.http.post<Grades>(`${this.apiServerUrl}/api/user/grade/${studentId}/${grade}/${courseId}`, {observe: 'response'});
    }

    public getGrade(studentId: number, courseId:number): Observable<Grades[]>{
        return this.http.get<Grades[]>(`${this.apiServerUrl}/api/user/grades/${studentId}/${courseId}`);
    }

    public getGrades(studentId: number, courseId:number): Observable<Grades[]>{
        return this.http.get<Grades[]>(`${this.apiServerUrl}/api/user/getGrades/${studentId}/${courseId}`);
    }

    public setExam(courseId: number, userId: number, value: boolean): Observable<void>{
        return this.http.post<void>(`${this.apiServerUrl}/api/user/setExam/${courseId}/${userId}/${value}`, {observe: 'response'});
    }
}