import { Component, OnInit, inject, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../../../services/data';
import { AuthUser } from '../../../services/auth-user';

@Component({
  selector: 'app-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class SettingsComponent implements OnInit {
  activeTab: 'profile' | 'security' | 'notifications' | 'appearance' = 'profile';
  route = inject(ActivatedRoute);
  platformId = inject(PLATFORM_ID);
  dataService = inject(Data);
  router = inject(Router);
  cd = inject(ChangeDetectorRef);

  // Mock user data

  // Profile data
  profile = {
    id: 0,
    UserName: 'User',
    Email: 'admin@t3alemcodi.com',
    role: 'Super Admin',
    bio: 'System Administrator for T3alem Codi.',
  };

  // Security data
  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
  };

  // Notification preferences
  notifications = {
    emailSummaries: true,
    newEnrollments: true,
    platformAlerts: false,
    marketingUpdates: false,
    securityAlerts: true,
  };

  // Appearance
  appearance = {
    isDarkMode: false,
  };

  constructor(private userAuth: AuthUser) {}

  ngOnInit(): void {
    // Check if dark theme is currently applied globally
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark') {
        this.appearance.isDarkMode = true;
      } else if (savedTheme === 'light') {
        this.appearance.isDarkMode = false;
      } else {
        this.appearance.isDarkMode = document.body.classList.contains('dark-theme');
      }
      this.dataService
        .getUserById(
          Number(
            this.userAuth.helper.decodeToken(localStorage.getItem('token') || '')[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ],
          ),
        )
        .subscribe({
          next: (res: any) => {
            this.profile.Email = res.email;
            this.profile.id = res.id;
            this.profile.UserName = res.userName;
            this.profile.role = res.role;
            this.cd.detectChanges();
          },
          error: (error) => {
            alert('Error fetching user data: ' + error.error.message);
          },
        });
    }

    this.route.queryParams.subscribe((params) => {
      if (params['tab']) {
        this.activeTab = params['tab'] as any;
      }
    });
  }

  setTab(tab: 'profile' | 'security' | 'notifications' | 'appearance'): void {
    this.activeTab = tab;
  }

  toggleTheme(): void {
    if (this.appearance.isDarkMode) {
      if (isPlatformBrowser(this.platformId)) {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
      }
    } else {
      if (isPlatformBrowser(this.platformId)) {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
      }
    }
  }

  saveProfile(): void {
    if (!this.profile.UserName || !this.profile.Email) {
      alert('User Name and Email are required!');
      return;
    }
    this.dataService.changeAdminCredentials(this.profile.id, this.profile.Email, this.profile.UserName).subscribe({
      next: (res) => {
        alert('UserName and Emailchanged successfully please login again!');
          localStorage.removeItem('token');
          this.router.navigate(['/admin/login']);
      },
      error: (error) => {
        alert('Error updating profile: ' + error.error.message);
      },
    });
  }

  saveSecurity(): void {
    if (this.security.newPassword !== this.security.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const token = localStorage.getItem('token');
    const userId = Number(
      this.userAuth.helper.decodeToken(token || '')[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ],
    );
    this.dataService
      .changeAdminPassword(userId, this.security.currentPassword, this.security.newPassword)
      .subscribe({
        next: (res) => {
          alert('Password changed successfully please login again!');
          localStorage.removeItem('token');
          this.router.navigate(['/admin/login']);
        },
        error: (error) => {
          alert('Error changing password: ' + error.error.message);
        },
      });
  }

  saveNotifications(): void {
    alert('Notification preferences updated!');
  }
}
