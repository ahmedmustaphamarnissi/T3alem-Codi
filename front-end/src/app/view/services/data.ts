import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Data {
  constructor(private http: HttpClient) {}
  header = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));
  getAllStudents() {
    return this.http.get('https://localhost:7009/api/student', { headers: this.header });
  }
  getStudentById(id: number) {
    return this.http.get('https://localhost:7009/api/student/' + id, { headers: this.header });
  }
  addStudent(studentData: any) {
    return this.http.post('https://localhost:7009/api/student', studentData, {
      headers: this.header,
    });
  }
  deleteStudent(studentId: number) {
    return this.http.delete('https://localhost:7009/api/student/' + studentId, {
      headers: this.header,
    });
  }
  UpdateStudent(studentId: number, studentData: any) {
    return this.http.put('https://localhost:7009/api/student/' + studentId, studentData, {
      headers: this.header,
    });
  }
  getUserById(id: number) {
    return this.http.get('https://localhost:7009/api/user/' + id, { headers: this.header });
  }
  UpdateUser(userId: number, userData: any) {
    return this.http.put('https://localhost:7009/api/User/' + userId, userData, {
      headers: this.header,
      responseType: 'text',
    });
  }
  GetInstructors() {
    return this.http.get('https://localhost:7009/api/Instructors', { headers: this.header });
  }
  GetInstructorById(id: number) {
    return this.http.get('https://localhost:7009/api/Instructors/' + id, { headers: this.header });
  }
  UpdateInstructor(instructorId: number, instructorData: any) {
    return this.http.put('https://localhost:7009/api/Instructors/' + instructorId, instructorData, {
      headers: this.header,
    });
  }
  DeleteInstructor(instructorId: number) {
    return this.http.delete('https://localhost:7009/api/Instructors/' + instructorId, {
      headers: this.header,
    });
  }
  AddInstructor(instructorData: any) {
    return this.http.post('https://localhost:7009/api/Instructors', instructorData, {
      headers: this.header,
    });
  }
  GetCourses() {
    return this.http.get('https://localhost:7009/api/Courses', { headers: this.header });
  }
  GetCourseById(id: number) {
    return this.http.get('https://localhost:7009/api/Courses/' + id, { headers: this.header });
  }
  GetDomains() {
    return this.http.get('https://localhost:7009/api/Domain', { headers: this.header });
  }
  UpdateCourse(courseId: number, courseData: any) {
    return this.http.put('https://localhost:7009/api/Courses/' + courseId, courseData, {
      headers: this.header,
    });
  }
  AddCourse(courseData: any) {
    return this.http.post('https://localhost:7009/api/Courses', courseData, {
      headers: this.header,
    });
  }
  changeUserPassword(id: number, oldPassword: string, newPassword: string) {
    return this.http.post(
      'https://localhost:7009/api/User/password/' + id,
      { oldPassword, newPassword },
      {
        headers: this.header,
      },
    );
  }

  changeAdminPassword(id: number, oldPassword: string, newPassword: string) {
    return this.http.post(
      'https://localhost:7009/api/User/password/admin/' + id,
      { oldPassword, newPassword },
      {
        headers: this.header,
      },
    );
  }
  changeAdminCredentials(id: number, email: string, userName: string) {
    return this.http.post(
      'https://localhost:7009/api/User/admin/' + id,
      { email, userName },
      {
        headers: this.header,
        
      },
    );
  }
}
