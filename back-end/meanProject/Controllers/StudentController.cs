using meanProject.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace meanProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StudentController : ControllerBase
    {

        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<StudentDTO>> GetAllStudents()
        {
            List<StudentDTO>? students = meanBuisnessLayer.clsStudent.GetAllStudents();
            if (students == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            if (students.Count == 0)
            {
                return NotFound("No Students Found!");
            }
            return Ok(students);

        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<StudentDTO> GetStudentById(int id)
        {
            StudentDTO? student = meanBuisnessLayer.clsStudent.GetStudent(id);
            if (student == null)
            {
                return NotFound($"No Student Found with ID: {id}");
            }
            return Ok(student);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public ActionResult<int> AddNewStudent(StudentDTO student)
        {
            if (student == null || string.IsNullOrEmpty(student.FirstName) || string.IsNullOrEmpty(student.LastName) || string.IsNullOrEmpty(student.Email) || string.IsNullOrEmpty(student.phone) || student.age < 1)
            {
                return BadRequest("Invalid student data. First name, Last name, email , phone and  age are required.");
            }
            int? newId = meanBuisnessLayer.clsStudent.AddStudent(student);
            if (newId == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Failed to add student.");
            }
            return StatusCode(StatusCodes.Status201Created, newId);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public ActionResult<StudentDTO> UpdateStudent(int id, StudentDTO student)
        {
            if (student == null || string.IsNullOrEmpty(student.FirstName) || string.IsNullOrEmpty(student.LastName) || string.IsNullOrEmpty(student.Email) || string.IsNullOrEmpty(student.phone) || student.age < 1)
            {
                return BadRequest("Invalid student data. First name, Last name, email , phone and  age are required.");
            }
            if (meanBuisnessLayer.clsStudent.GetStudent(id) == null)
            {
                return NotFound($"No Student Found with ID: {id}");
            }
            StudentDTO? updatedStudent = meanBuisnessLayer.clsStudent.UpdateStudent(id, student);
            if (updatedStudent == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "failed to delete student");
            }

            return Ok(updatedStudent);

        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public ActionResult<int> DeleteStudent(int id)
        {
            if (meanBuisnessLayer.clsStudent.GetStudent(id) == null)
            {
                return NotFound($"No Student Found with ID: {id}");
            }
            int? Id = meanBuisnessLayer.clsStudent.DeleteStudent(id);
            if (Id == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "failed to delete student");
            }
            return Ok(Id);
        }
    }
}
