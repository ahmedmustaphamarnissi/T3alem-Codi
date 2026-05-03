import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AdminAuth {
  helper = new JwtHelperService();
  constructor(private http: HttpClient,@Inject(PLATFORM_ID) private platformId: Object) {}
  getUserName(){
    const decodedata = this.helper.decodeToken(localStorage.getItem('token') || '');
    return decodedata['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
  }
  CheckAdmin(res: any) {
    const decodedata = this.helper.decodeToken(res.token);
    const role = decodedata['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    return role === 'Admin';
  }
  login(email: string, password: string) {
    return this.http.post('https://localhost:7009/api/Auth/login', { email, password });
  }
  SaveData(res: any) {
    localStorage.setItem('token', res.token);
  }
  IsLoggedIn() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decoded = this.helper.decodeToken(token);
  const role = decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  if (role !== 'Admin') return false;

  return !this.helper.isTokenExpired(token);
}
}
