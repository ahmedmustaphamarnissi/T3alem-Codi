import { Component, OnInit, inject, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Data } from '../../../services/data';

interface Domain {
  id: number;
  name: string;
}

interface Instructor {
  id: number;
  firstName: string;
  lastName: string;
  cin: string;
  salary: number;
  domainName: string;
}

@Component({
  selector: 'app-add-course',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './add-course.html',
  styleUrl: './add-course.css',
})
export class AddCourse implements OnInit {
  domains: Domain[] = [];
  allInstructors: Instructor[] = [];
  filteredInstructors: Instructor[] = [];
  selectedDomainId: number | null = null;

  private dataService = inject(Data);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.dataService.GetDomains().subscribe({
      next: (res: any) => {
        this.domains = res;
        this.cd.markForCheck();
      },
      error: (err: any) => console.error('Error loading domains', err),
    });

    this.dataService.GetInstructors().subscribe({
      next: (res: any) => {
        this.allInstructors = res;
        this.cd.markForCheck();
      },
      error: (err: any) => console.error('Error loading instructors', err),
    });
  }

  onDomainChange(domainId: any): void {
    const id = Number(domainId);
    const selectedDomain = this.domains.find((d) => d.id === id);
    if (selectedDomain) {
      this.filteredInstructors = this.allInstructors.filter(
        (i) => i.domainName === selectedDomain.name,
      );
    } else {
      this.filteredInstructors = [];
    }
    this.cd.markForCheck();
  }

  add(f: NgForm): void {
    if (f.invalid) return;

    const course = {
      name: f.value.name,
      description: f.value.description,
      price: f.value.price,
      imageUrl: f.value.imageUrl || null,
      domainName: f.value.domainId
        ? this.domains.find((d) => d.id === Number(f.value.domainId))?.name
        : null,
      instructorName: f.value.instructorId
        ? this.allInstructors.find((i) => i.id === Number(f.value.instructorId))?.firstName +
          ' ' +
          this.allInstructors.find((i) => i.id === Number(f.value.instructorId))?.lastName
        : null,
    };


    this.dataService.AddCourse(course).subscribe({
      next: () => {
        alert('Course added successfully');
        this.router.navigate(['/admin/courses']);
      },
      error: (err: any) => alert('Error adding course'),
    });
  }

  resetForm(f: NgForm): void {
    f.resetForm();
    this.selectedDomainId = null;
    this.filteredInstructors = [];
    this.cd.markForCheck();
  }
}
