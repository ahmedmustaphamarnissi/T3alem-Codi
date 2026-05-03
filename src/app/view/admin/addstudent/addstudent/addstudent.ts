import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Data } from '../../../services/data';

@Component({
  selector: 'app-addstudent',
  imports: [FormsModule, RouterLink],
  templateUrl: './addstudent.html',
  styleUrl: './addstudent.css',
})
export class Addstudent {
  constructor(private router : Router , private data:Data){
     
  }
    add(studentData : any){
      this.data.addStudent(studentData.value).subscribe({
        next : (res:any) => {
          alert('Student added successfully!');
          studentData.reset();
        }
        , error : (err:any) => {
          alert('Failed to add student!');
        }
      })

    }
    back(){
      this.router.navigate(['/admin/allstudents']);
    }
    
}
