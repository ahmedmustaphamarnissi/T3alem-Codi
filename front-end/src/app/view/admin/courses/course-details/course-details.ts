import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Data } from '../../../services/data';

interface Lesson {
  title: string;
  duration: number; // minutes
}

interface Section {
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  instructorName: string;
  domainName: string;
  isActive: boolean;
  level?: string;         // 'Beginner' | 'Intermediate' | 'Advanced'
  duration?: number;      // total hours
  studentsCount?: number;
  rating?: number;
  language?: string;
  createdAt?: string | Date;
  whatYouLearn?: string[];
  requirements?: string[];
  sections?: Section[];
}

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  course: Course | null = null;
  isLoading = true;

  private route = inject(ActivatedRoute);
  private dataService = inject(Data);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      if (id) {
        this.dataService.GetCourseById(id).subscribe({
          next: (res: any) => {
            this.course = res;
            this.isLoading = false;
            this.cd.markForCheck();
          },
          error: (err: any) => {
            console.error('Error fetching course details', err);
            this.isLoading = false;
            this.cd.markForCheck();
          },
        });
      }
    });
  }
}