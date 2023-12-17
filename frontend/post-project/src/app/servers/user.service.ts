import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  private url = 'http://127.0.0.1:3000/user/';

  register(user: any) {
    return this.http.post(this.url + 'register', user);
  }

  login(user: any) {
    return this.http.post(this.url + 'login', user);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
  }

  isloggedin() {
    return !!localStorage.getItem('token');
  }

  getuserdatafromtoken() {
    return localStorage.getItem('currentUser') || '';
  }
  getbyid(id: any) {
    return this.http.get(this.url + 'getuserbyid/' + id);
  }

  update(id:any ,data: any) {
    return this.http.put(this.url + '/update/' +id, data);
  }
  private userRole: string = ''; // Variable pour stocker le rôle de l'utilisateur

  setUserRole(role: string) {
    this.userRole = role;
  }

  getUserRole(): string {
    return this.userRole;
  }
}