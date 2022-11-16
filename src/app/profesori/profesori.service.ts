import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profesors } from '../classes/profesors';
import { User } from '../user/user.model';


@Injectable({
    providedIn: 'root'
})
export class ProfesorService {
    private apiServerUrl = environment.apiBaseUrl;
    constructor(private http: HttpClient) { }

    public getProfessors(): Observable<Profesors[]>{
        return this.http.get<Profesors[]>(`${this.apiServerUrl}/api/user/allProfessors`);
    }
    public addProfessor(user: User): Observable<User> {
        return this.http.post<User>(`${this.apiServerUrl}/api/user/add`, user);
    }
    public deleteProfessor(profesorId: number): Observable<void>{
        return this.http.delete<void>(`${this.apiServerUrl}/api/user/delete/${profesorId}`);
    }
    /*public onGetProfessor(id: number): Observable<Profesors>{
        return this.http.get(`${this.apiServerUrl}/users/edit/${id}`);
    }*/
    /*getProfesorsLarge() {
        return this.http.get<any>('assets/profesors-large.json')
            .toPromise()
            .then(res => <Profesors[]>res.data)
            .then(data => { return data; });
    }*/
}