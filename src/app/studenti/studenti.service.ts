import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Students } from '../classes/students';


@Injectable({
    providedIn: 'root'
})
export class StudentService {
    private apiServerUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getStudents(): Observable<Students[]>{
        return this.http.get<Students[]>(`${this.apiServerUrl}/api/user/allStudents`);
    }
    public addStudent(student: Students): Observable<Students> {
        return this.http.post<Students>(`${this.apiServerUrl}/api/user/add`, student);
    }
    public deleteStudent(studentId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/api/user/delete/${studentId}`);
    }
}