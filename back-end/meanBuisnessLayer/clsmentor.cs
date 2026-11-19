using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using meanDataAccessLayer;
using meanDataAccessLayer.DTO;

namespace meanBuisnessLayer
{
    public class clsmentor
    {
        public static List<InstructorDTO>? GetAllMentors()
        {
            return mentors.GetAllMentors();
        }
        public static bool? DeleteInstructor(int id)
        {
            return mentors.DeleteInstructor(id);
        }
        public static InstructorDTO? GetInstructorById(int id)
        {
            return mentors.GetInstructorById(id);
        }
        public static int? AddInstructor(InstructorDTO instructor)
        {
            return mentors.AddInstructor(instructor);
        }
        public static InstructorDTO? UpdateInstructor(int id, InstructorDTO instructor)
        {
            return mentors.UpdateInstructor(id, instructor);
        }
    }
}
