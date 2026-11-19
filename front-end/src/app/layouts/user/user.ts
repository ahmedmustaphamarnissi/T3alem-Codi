import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { AuthUser } from '../../view/services/auth-user';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user.html',
  styleUrls: ['./user.css'],
})
export class User {
  VerifyConnect: boolean = false;
  constructor(
    public userAuth: AuthUser,
    private router: Router,
  ) {}
  Logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
