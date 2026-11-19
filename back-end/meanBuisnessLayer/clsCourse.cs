using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using meanDataAccessLayer;
using meanDataAccessLayer.DTO;

namespace meanBuisnessLayer
{
    public class clsCourse
    {
        public static List<CourseDTO>? GetAllCourses()
        {
            return Courses.GetAllCourses();
        }
        public static CourseDTO? GetCourseById(int id)
        {
            return Courses.GetCourseById(id);
        }
        public static int? AddCourse(CourseDTO Course)
        {
            return Courses.AddNewCourse(Course);
        }
        public static CourseDTO? UpdateCourse(int id, CourseDTO Course)
        {
            return Courses.UpdateCourse(id, Course);
        }
    }
}
