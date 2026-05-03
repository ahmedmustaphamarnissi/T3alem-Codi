import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Data } from '../../../services/data';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { error } from 'node:console';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule],
  templateUrl: './edit-user.html',
  styleUrl: './edit-user.css',
})
export class EditUser implements OnInit {
  student: any = {};
  helper = new JwtHelperService();
  private studentService = inject(Data);
  private cd = inject(ChangeDetectorRef);

  constructor(private router: Router) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return;
    }
    const decoded = this.helper.decodeToken(token);
    const id = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    if (id) {
      this.studentService.getUserById(id).subscribe({
        next: (data: any) => {
          this.student = data;
          this.cd.detectChanges();
        },
        error: (err: any) => {
          alert('Error fetching user data!');
        },
      });
    } else {
      alert('Invalid token! Please log in again.');
      this.router.navigate(['/login']);
    }
  }

  UpdateStudent(f: any): void {
    if (f.invalid) return;

    const payload = {
      userName: this.student.userName,
      email: this.student.email,
      HashPassword: this.student.password,
    };
    console.log(payload);

    this.studentService.UpdateUser(this.student.id, payload).subscribe(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
      alert('User updated successfully! Please log in again.');
    });
  }

  onCancel(): void {
    this.router.navigate(['/students']);
  }
}
