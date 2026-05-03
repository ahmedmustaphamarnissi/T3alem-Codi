import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Data } from '../../../services/data';


@Component({
  selector: 'app-allstudents',
  imports: [],
  templateUrl: './allstudents.html',
  styleUrl: './allstudents.css',
})
export class Allstudents {
     students: any[] = [];
  student = {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: 0,
  };

  private data = inject(Data);
  private cd = inject(ChangeDetectorRef);

  ngOnInit(): void {
    this.data.getAllStudents().subscribe((res: any) => {
      this.students = res;
      this.cd.detectChanges();
    });
  }
  delete(studentId: number, index: number) {
    if (confirm('Are you sure you want to delete the student with ID ' + studentId + '?')) {
      this.data.deleteStudent(studentId).subscribe({
        next: (res: any) => {
          this.students.splice(index, 1);
          this.cd.detectChanges();
          alert('Student deleted successfully!');
        },
        error: (err: any) => {
          alert('Error deleting student!');
        },
      });
    } else {
      alert('Deleting Student is canceled');
    }
  }
  sendData(index: number) {
    this.student = this.students[index];
  }
}
