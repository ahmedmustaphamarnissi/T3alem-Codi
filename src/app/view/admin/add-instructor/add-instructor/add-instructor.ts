import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Data } from '../../../services/data';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-add-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './add-instructor.html',
  styleUrls: ['./add-instructor.css'],
})
export class AddInstructor {
  constructor(private data: Data) {

  }
  add(f: any) {
    this.data.AddInstructor(f.value).subscribe({
      next: (res: any) => {
        alert('Instructor added successfully!');
      },
      error: (err) => {
        alert(err.message);
      },
    });
  }
}
