import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
import { Data } from '../../../services/data';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';

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
  imports: [FormsModule, RouterModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  dataService = inject(Data);
  cd = inject(ChangeDetectorRef);
  courses: Course[] = [];
  course: Course = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imageUrl: '',
    fullName: '',
    domainName: '',
  };

  currentPage: number = 1;
  itemsPerPage: number = 10;

  get paginatedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.courses.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages() {
    return Math.ceil(this.courses.length / this.itemsPerPage);
  }

  get pagesArray() {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  constructor(private router: Router) {}
  ngOnInit(): void {
    this.dataService.GetCourses().subscribe((res: any) => {
      this.courses = res.filter((c: any) => c && c.id != null);
      this.cd.detectChanges();
    });
  }
  sendData(id: number) {
    this.course = this.courses.find((c) => c.id === id)!;
    this.cd.detectChanges();
  }
  details(id: number) {
    this.router.navigate(['/admin/courses/details', id]);
  }
  UpdateCourse(form: any) {
    this.dataService.UpdateCourse(this.course.id, this.course).subscribe({
      next: (res) => {
        alert('Course updated successfully');
        this.closeModal();
        this.router.navigate(['/admin/courses']);
      },
      error: (err) => {
        alert(err.message || 'Error updating course');
      },
    });
  }
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.course.imageUrl = file.name; // or handle upload
    }
  }
  closeModal() {
    const modalEl = document.getElementById('exampleModal');
    const modal = (window as any).bootstrap.Modal.getInstance(modalEl);
    modal?.hide();
  }
}
