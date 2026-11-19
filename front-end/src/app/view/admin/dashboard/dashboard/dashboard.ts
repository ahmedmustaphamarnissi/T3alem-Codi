import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit, AfterViewInit {
  
     // Reference to the <canvas #enrollmentChart> in the template
  @ViewChild('enrollmentChart') enrollmentChartRef!: ElementRef<HTMLCanvasElement>;

  // ---- STATS CARDS DATA ----
  // Replace these values with real data from your ApiService
  dashboardStats = [
    {
      label: 'Total Students',
      value: '1,284',
      icon: 'fa-user-graduate',
      trend: '+12% this month',
      trendUp: true,
      color: '#6366f1'
    },
    {
      label: 'Active Courses',
      value: '38',
      icon: 'fa-book-open',
      trend: '+3 new courses',
      trendUp: true,
      color: '#8b5cf6'
    },
    {
      label: 'Instructors',
      value: '14',
      icon: 'fa-chalkboard-teacher',
      trend: '+1 this month',
      trendUp: true,
      color: '#06b6d4'
    },
    {
      label: 'Completions',
      value: '892',
      icon: 'fa-trophy',
      trend: '-5% vs last month',
      trendUp: false,
      color: '#f59e0b'
    }
  ];

  // ---- ACTIVITY FEED DATA ----
  activityFeed = [
    {
      initials: 'AM',
      name: 'Ahmed M.',
      action: 'enrolled in Angular Fundamentals',
      time: '2 min ago',
      type: 'Enroll',
      color: '#6366f1'
    },
    {
      initials: 'SR',
      name: 'Sara R.',
      action: 'completed C++ Basics quiz',
      time: '15 min ago',
      type: 'Quiz',
      color: '#8b5cf6'
    },
    {
      initials: 'KT',
      name: 'Khaled T.',
      action: 'submitted STM32 project',
      time: '1 hr ago',
      type: 'Project',
      color: '#06b6d4'
    },
    {
      initials: 'LB',
      name: 'Lina B.',
      action: 'started JavaScript course',
      time: '3 hrs ago',
      type: 'Enroll',
      color: '#f59e0b'
    },
    {
      initials: 'MN',
      name: 'Mohamed N.',
      action: 'left a review on Python course',
      time: '5 hrs ago',
      type: 'Review',
      color: '#10b981'
    }
  ];

  // ---- TOP COURSES DATA ----
  topCourses = [
    { name: 'Angular Fundamentals', instructor: 'Ahmed K.', icon: 'fa-layer-group', color: '#6366f1', progress: 82 },
    { name: 'C++ for Beginners',    instructor: 'Sara M.',  icon: 'fa-code',        color: '#8b5cf6', progress: 74 },
    { name: 'STM32 Embedded',       instructor: 'Bilal R.', icon: 'fa-microchip',   color: '#06b6d4', progress: 61 },
    { name: 'Python Crash Course',  instructor: 'Nour A.',  icon: 'fa-snake',       color: '#10b981', progress: 55 }
  ];

  // ---- TOP STUDENTS DATA ----
  topStudents = [
    { initials: 'SR', name: 'Sara R.',    course: 'Angular',  score: 98, status: 'active',   color: '#6366f1' },
    { initials: 'AM', name: 'Ahmed M.',   course: 'C++',      score: 95, status: 'active',   color: '#8b5cf6' },
    { initials: 'LB', name: 'Lina B.',    course: 'Python',   score: 91, status: 'active',   color: '#10b981' },
    { initials: 'KT', name: 'Khaled T.',  course: 'STM32',    score: 88, status: 'pending',  color: '#f59e0b' },
    { initials: 'MN', name: 'Mohamed N.', course: 'Angular',  score: 82, status: 'inactive', color: '#ef4444' }
  ];

  ngOnInit(): void {
    // Here you can call your DataService to load real data
    // Example:
    // this.adminService.getStats().subscribe(data => this.dashboardStats = data);
  }

  ngAfterViewInit(): void {
    // Build the chart AFTER the view is rendered (canvas is in DOM)
    this.buildEnrollmentChart();
  }

  // ---- CHART.JS SETUP ----
  buildEnrollmentChart(): void {
    const ctx = this.enrollmentChartRef.nativeElement.getContext('2d');
    if (!ctx) return;

    // Gradient fill for the chart area
    const gradientBlue = ctx.createLinearGradient(0, 0, 0, 300);
    gradientBlue.addColorStop(0, 'rgba(99, 102, 241, 0.35)');
    gradientBlue.addColorStop(1, 'rgba(99, 102, 241, 0)');

    const gradientPurple = ctx.createLinearGradient(0, 0, 0, 300);
    gradientPurple.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
    gradientPurple.addColorStop(1, 'rgba(139, 92, 246, 0)');

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'New Enrollments',
            data: [45, 72, 58, 95, 110, 88, 132, 145, 120, 160, 175, 200],
            borderColor: '#6366f1',
            backgroundColor: gradientBlue,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#6366f1',
            pointRadius: 4,
            pointHoverRadius: 7
          },
          {
            label: 'Completions',
            data: [20, 35, 42, 60, 75, 65, 95, 110, 88, 120, 130, 155],
            borderColor: '#8b5cf6',
            backgroundColor: gradientPurple,
            borderWidth: 2.5,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#8b5cf6',
            pointRadius: 4,
            pointHoverRadius: 7
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
            labels: {
              color: 'rgba(255,255,255,0.6)',
              font: { family: 'DM Sans', size: 12 },
              boxWidth: 12,
              usePointStyle: true
            }
          },
          tooltip: {
            backgroundColor: '#1e1b4b',
            borderColor: 'rgba(99,102,241,0.3)',
            borderWidth: 1,
            titleColor: '#fff',
            bodyColor: 'rgba(255,255,255,0.7)',
            padding: 10
          }
        },
        scales: {
          x: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: 'rgba(255,255,255,0.4)', font: { family: 'DM Sans' } }
          },
          y: {
            grid: { color: 'rgba(255,255,255,0.04)' },
            ticks: { color: 'rgba(255,255,255,0.4)', font: { family: 'DM Sans' } }
          }
        }
      }
    });
  }
}
