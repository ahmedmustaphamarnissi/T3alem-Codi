using meanBuisnessLayer;
using meanDataAccessLayer.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace meanProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public ActionResult<List<CourseDTO>> GetAllCourses()
        {
            List<CourseDTO>? Courses = new List<CourseDTO>();
            Courses = clsCourse.GetAllCourses();
            if (Courses == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server side Problem");
            }
            if (Courses.Count() == 0)
            {
                return NotFound("No Courses found");
            }
            return Ok(Courses);
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<CourseDTO> GetCourseById(int id)
        {
            CourseDTO? Course = meanBuisnessLayer.clsCourse.GetCourseById(id);
            if (Course == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
            if (Course.id == -1)
            {
                return NotFound($"No Course Found with ID: {id}");
            }
            return Ok(Course);
        }

        [HttpPost]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Authorize(Roles = "Admin")]
        public ActionResult<int> AddNewCourse(CourseDTO Course)
        {
            if (Course == null || string.IsNullOrEmpty(Course.name) || string.IsNullOrEmpty(Course.description)
                || string.IsNullOrEmpty(Course.domainName) || string.IsNullOrEmpty(Course.instructorName)
                || string.IsNullOrEmpty(Course.imageUrl) || Course.price < 0) // reglage domainId later
            {
                return BadRequest("Invalid Course credentials");
            }
            int? newId = meanBuisnessLayer.clsCourse.AddCourse(Course);
            if (newId == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server side Error");
            }
            if (newId == -1)
            {
                return BadRequest("Failed to add Course");
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
        public ActionResult<InstructorDTO> UpdateCourse(int id, CourseDTO Course)
        {
            if (Course == null || string.IsNullOrEmpty(Course.name) || string.IsNullOrEmpty(Course.description)
                || string.IsNullOrEmpty(Course.domainName) || string.IsNullOrEmpty(Course.instructorName)
                || string.IsNullOrEmpty(Course.imageUrl) || Course.price < 0 || id < 0) // reglage domainId later
            {
                return BadRequest("Invalid Course credentials");
            }

            if (meanBuisnessLayer.clsCourse.GetCourseById(id) == null)
            {
                return NotFound($"No Course Found with ID: {id}");
            }
            CourseDTO? updatedCourse = meanBuisnessLayer.clsCourse.UpdateCourse(id, Course);

            if (updatedCourse == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "server side error");
            }
            if (updatedCourse.id == -1)
            {
                return BadRequest("Failed to update Course");
            }

            return Ok(updatedCourse);

        }


    }
}
