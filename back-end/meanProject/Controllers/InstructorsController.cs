using meanBuisnessLayer;
using meanDataAccessLayer.DTO;
using meanProject.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace meanProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class InstructorsController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<InstructorDTO>> GetMentors()
        {
            List<InstructorDTO>? Mentors = new List<InstructorDTO>();
            Mentors = clsmentor.GetAllMentors();
            if (Mentors == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server side Problem");
            }
            if (Mentors.Count() == 0)
            {
                return NotFound("No Instructors found");
            }
            return Ok(Mentors);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<InstructorDTO> GetMentorById(int id)
        {
            InstructorDTO? Instructor = meanBuisnessLayer.clsmentor.GetInstructorById(id);
            if (Instructor == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
            if (Instructor.id == -1)
            {
                return NotFound($"No Instructor Found with ID: {id}");
            }
            return Ok(Instructor);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<int> AddNewMentor(InstructorDTO instructor)
        {
            if (instructor == null || string.IsNullOrEmpty(instructor.firstName) || string.IsNullOrEmpty(instructor.lastName)
                || string.IsNullOrEmpty(instructor.cin) || instructor.salary < 0) // reglage domainId later
            {
                return BadRequest("Invalid Instructor credentials");
            }
            int? newId = meanBuisnessLayer.clsmentor.AddInstructor(instructor);
            if (newId == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server side Error");
            }
            if (newId == -1)
            {
                return BadRequest("Failed to add Student");
            }
            return StatusCode(StatusCodes.Status201Created, newId);
        }

        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<InstructorDTO> UpdateStudent(int id, InstructorDTO instructor)
        {
            if (instructor == null || string.IsNullOrEmpty(instructor.firstName) || string.IsNullOrEmpty(instructor.lastName)
                || string.IsNullOrEmpty(instructor.cin) || instructor.salary < 0 || id < 0) // reglage domainId later
            {
                return BadRequest("Invalid Instructor credentials");
            }

            if (meanBuisnessLayer.clsmentor.GetInstructorById(id) == null)
            {
                return NotFound($"No Instructor Found with ID: {id}");
            }
            InstructorDTO? updatedInstuctor = meanBuisnessLayer.clsmentor.UpdateInstructor(id, instructor);

            if (updatedInstuctor == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "server side error");
            }
            if (updatedInstuctor.id == -1)
            {
                return BadRequest("Failed to update Instructor");
            }

            return Ok(updatedInstuctor);

        }

        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<int> DeleteStudent(int id)
        {
            if (id < 0)
            {
                return BadRequest("Invalid Instructor ID");
            }
            InstructorDTO? ins = meanBuisnessLayer.clsmentor.GetInstructorById(id) ?? null;
            if (ins == null)
            {
                return NotFound("we do not have an Active Instructor with this ID");
            }

            bool? res = meanBuisnessLayer.clsmentor.DeleteInstructor(id);

            if (res == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "server side error");
            }
            if (res == false)
            {
                return BadRequest("Failed to delete Instructor");
            }
            return Ok(res);
        }
    }
}
