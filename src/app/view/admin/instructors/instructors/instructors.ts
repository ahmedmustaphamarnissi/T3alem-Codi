import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Data } from '../../../services/data';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-instructors',
  imports: [FormsModule, RouterLink],
  templateUrl: './instructors.html',
  styleUrl: './instructors.css',
})
export class Instructors implements OnInit {
  data = inject(Data);
  cd = inject(ChangeDetectorRef);

  monitors!: instructorsInter[];
  instructor!: instructorsInter;
  constructor() {}
  ngOnInit(): void {
    this.data.GetInstructors().subscribe({
      next: (res: any) => {
        this.monitors = res;
        console.log(this.monitors);
        this.cd.detectChanges();
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  UpdateInstructor(f: any) {
    this.data.UpdateInstructor(this.instructor.id, this.instructor).subscribe({
      next: (res: any) => {
        alert('Instructor updated successfully!');
        this.instructor = res;
        this.cd.detectChanges();
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  sendData(id: number) {
    this.data.GetInstructorById(id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.instructor = res;
        this.cd.detectChanges();
      },
      error: (err: any) => {
        alert(err.message);
      },
    });
  }
  Delete(id: number) {
    if (confirm('Are you sure you want to delete this instructor?')) {
      this.data.DeleteInstructor(id).subscribe({
        next: () => {
          alert('Instructor deleted successfully!');
          this.monitors = this.monitors.filter((instructor) => instructor.id !== id);
          this.cd.detectChanges();
        },
        error: (err) => {
          alert(err.message);
        },
      });
    }
  }
}
export interface instructorsInter {
  id: number;
  cin: string;
  firstName: string;
  lastName: string;
  salary: number;
  domainName: string;
}
