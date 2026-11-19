import { Component, EventEmitter, Input, Output,HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuth } from '../../view/services/admin-auth';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './admin.html',
  styleUrls: ['./admin.css'],
})
export class Admin {
  constructor(private adminAuth: AdminAuth,private router:Router) {
   this.username = this.adminAuth.getUserName();
  }

  dropdownOpen = false;
  mobileMenuOpen = false;

toggleDropdown() {
  this.dropdownOpen = !this.dropdownOpen;
}

toggleMobileMenu() {
  this.mobileMenuOpen = !this.mobileMenuOpen;
}

logout() {
  localStorage.removeItem('token');
  this.router.navigate(['/admin/login']);

}

@HostListener('document:click', ['$event'])
onDocumentClick(event: MouseEvent) {
  const target = event.target as HTMLElement;
  if (!target.closest('.user-info')) {
    this.dropdownOpen = false;
  }
  if (!target.closest('.mobile-menu-wrapper')) {
    this.mobileMenuOpen = false;
  }
}

  isCollapsed = false;
  username: string = 'Admin';
  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }
  @Input() pageTitle: string = 'Dashboard';
  @Input() pageSubtitle: string = 'Welcome back 👋';

  // Emit an event when the hamburger button is clicked
  // The parent (app.component) listens and toggles the sidebar
  @Output() toggleSidebar = new EventEmitter<void>();

  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
}
