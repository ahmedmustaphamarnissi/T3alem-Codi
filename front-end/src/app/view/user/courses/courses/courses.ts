import { Component, OnInit, inject, ChangeDetectionStrategy , ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Data } from '../../../services/data';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Course {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  fullName: string;
  domainName: string;
}

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
  changeDetection: ChangeDetectionStrategy.OnPush   // ✅ Fix #2
})
export class Courses implements OnInit {
  searchQuery: string = '';
  selectedDomain: string = '';
  selectedPrice: string = '';

  domains: string[] = [];
  courses: Course[] = [];
  filteredCourses: Course[] = [];

  private searchSubject = new Subject<string>();   // ✅ Fix #3
  dataService = inject(Data);
  cd  = inject(ChangeDetectorRef);

  ngOnInit(): void {
    // Debounce search — waits 300ms after user stops typing
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
      
    ).subscribe(() => this.applyFilters());

    this.dataService.GetCourses().subscribe((res: any) => {
      this.courses = res.filter((c: any) => c && c.id != null);
      this.applyFilters();
      this.cd.markForCheck();
    });

    this.dataService.GetDomains().subscribe((res: any) => {
      this.domains = res.filter((d: any) => d != null).map((d: any) => d.name ? d.name : d);
      this.cd.markForCheck();
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.searchSubject.next(value);   // push to debounce stream
  }

  applyFilters(): void {
    this.filteredCourses = this.courses.filter(course => {
      const search = this.searchQuery ? this.searchQuery.toLowerCase() : '';
      const cName = course.name ? course.name.toLowerCase() : '';
      const matchesSearch = cName.includes(search);
      const matchesDomain = this.selectedDomain ? course.domainName === this.selectedDomain : true;

      let matchesPrice = true;
      if (this.selectedPrice === 'Free') matchesPrice = course.price === 0;
      else if (this.selectedPrice === 'Paid') matchesPrice = course.price > 0;

      return matchesSearch && matchesDomain && matchesPrice;
    });
    this.cd.markForCheck();
  }

  trackByCourse(index: number, course: Course): number {
    return course.id;   // ✅ Fix #1
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedDomain = '';
    this.selectedPrice = '';
    this.applyFilters();
  }
}