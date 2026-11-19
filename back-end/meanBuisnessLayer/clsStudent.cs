using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using meanDataAccessLayer;
using meanProject.DTO;

namespace meanBuisnessLayer
{
    public class clsStudent
    {

        public static List<StudentDTO>? GetAllStudents()
        {
            List<StudentDTO>? students = Students.GetAllStudents();
            if (students.Count == 0)
            {
                return new List<StudentDTO>();
            }
            return students;

        }
        public static StudentDTO? GetStudent(int id)
        {
            StudentDTO? student = Students.GetStudentById(id);
            if (student == null)
            {
                return null;
            }
            return student;
        }
        public static int? AddStudent(StudentDTO student)
        {
            int? Id = Students.AddStudent(student);
            if (Id == null || Id <= 0)
            {
                return null;
            }
            return Id;
        }
        public static StudentDTO? UpdateStudent(int id, StudentDTO student)
        {
            StudentDTO? updatedStudent = Students.UpdateStudent(id, student);
            if (updatedStudent == null || updatedStudent.Id <= 0)
            {
                return null;
            }
            return updatedStudent;
        }
        public static int? DeleteStudent(int id)
        {
            int? Id = Students.DeleteStudent(id);
            if (Id == null || Id <= 0)
            {
                return null;
            }
            return Id;
        }

    }
}
