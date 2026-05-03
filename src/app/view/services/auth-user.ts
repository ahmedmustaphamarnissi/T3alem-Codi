import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthUser {
  constructor(private Http: HttpClient) {}
  helper = new JwtHelperService();
  Register(user: any) {
    return this.Http.post('https://localhost:7009/api/User/Register', user, {
      responseType: 'text',
    });
  }
  Login(user: any) {
    return this.Http.post('https://localhost:7009/api/Auth/login', user);
  }
  IsUserLoggedIn() {
    const token = localStorage.getItem('token');
    if (!token) return false;

    const decoded = this.helper.decodeToken(token);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    if (role === 'Admin') return false;

    return !this.helper.isTokenExpired(token);
  }
  checkrole(token: string) {
    const decoded = this.helper.decodeToken(token);
    const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role !== 'Admin';
  }
}
