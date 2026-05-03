import { Component, OnInit, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { AuthUser } from '../../../services/auth-user';
import { Data } from '../../../services/data';

@Component({
  selector: 'app-user-settings',
  imports: [CommonModule, FormsModule],
  templateUrl: './settings.html',
  styleUrls: ['./settings.css'],
})
export class SettingsComponent implements OnInit {
  activeTab: 'security' | 'notifications' | 'appearance' = 'appearance';
  route = inject(ActivatedRoute);
  router = inject(Router);
  platformId = inject(PLATFORM_ID);
  dataService = inject(Data);

  isLoggedIn = false;

  constructor(public userAuth: AuthUser) {}

  // Appearance
  appearance = {
    isDarkMode: false,
  };

  // Mock Security data
  security = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  notifications = {
    emailSummaries: true,
    newAlerts: true,
  };

  ngOnInit(): void {
    // Check auth status
    this.isLoggedIn = this.userAuth.IsUserLoggedIn();

    // Set default tab based on auth state
    if (this.isLoggedIn) {
      this.activeTab = 'security';
    } else {
      this.activeTab = 'appearance';
    }

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
    }

    this.route.queryParams.subscribe((params) => {
      if (params['tab']) {
        const tab = params['tab'];
        // Prevent guest from navigating to protected tabs via URL
        if (!this.isLoggedIn && tab !== 'appearance') {
          this.activeTab = 'appearance';
        } else {
          this.activeTab = tab as any;
        }
      }
    });
  }

  setTab(tab: 'security' | 'notifications' | 'appearance'): void {
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
    alert('Profile settings saved successfully!');
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
      .changeUserPassword(userId, this.security.currentPassword, this.security.newPassword)
      .subscribe({
        next: (res) => {
          alert('Password changed successfully please login again!');
          localStorage.removeItem('token');
          this.router.navigate(['/login']);
          this.security.currentPassword = '';
          this.security.newPassword = '';
          this.security.confirmPassword = '';
          
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
