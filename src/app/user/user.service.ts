import { Injectable } from '@angular/core';
import { SERVER_API_URL } from '../constants/app.constants';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { Authority } from '../constants/authority.constants';
import { Profesors } from '../classes/profesors';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  currentUser!: User | null;

  private usersUrl = `${SERVER_API_URL}/api/user`;
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.usersUrl}/current-user`);
  }

  isRoleAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.authorities === Authority.ADMIN;
    } else {
      return false;
    }
  }

  isRoleUser(): boolean {
    if (this.currentUser) {
      return this.currentUser.authorities === Authority.USER;
    } else {
      return false;
    }
  }

  isRoleDeleter(): boolean {
    if (this.currentUser) {
      return this.currentUser.authorities === Authority.DELETER;
    } else {
      return false;
    }
  }

  getStudentsData(userId: number): Observable<Profesors>{
    return this.http.get<Profesors>(`${this.apiServerUrl}/api/user/edit/${userId}`);
  }

  updateUser(profesor: Profesors[], userId: number): Observable<Profesors[]>{
    console.log(profesor);
    return this.http.put<Profesors[]>(`${this.apiServerUrl}/api/user/update/${userId}`, profesor);
  }

}
