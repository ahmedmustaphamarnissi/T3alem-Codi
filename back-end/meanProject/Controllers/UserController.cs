using System.Security.Claims;
using BCrypt.Net;
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
    public class UserController : ControllerBase
    {
        [AllowAnonymous]
        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<bool> AddUser(UserDTO user)
        {
            if (string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.HashPassword))
            {
                return BadRequest("Email , username and password are required");

            }
            bool res = meanBuisnessLayer.clsUser.AddNewUser(ref user);
            if (!res)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server Side error");
            }
            return Ok("User Created");
        }
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<UserDTO> GetUserById(int id)
        {
            if (id < 0)
            {
                return BadRequest("id must be valid");

            }
            UserDTO? user = meanBuisnessLayer.clsUser.GetUserById(id);
            if (user == null)
            {
                return NotFound($"No User Found with ID: {id}");
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var role = User.FindFirstValue(ClaimTypes.Role);

            // If the policy evaluation failed, the user is authenticated
            // but not authorized to access this resource.
            // This correctly returns HTTP 403 Forbidden.
            if (Convert.ToInt32(userId) != id && role != "Admin")
                return Forbid(); // 403 Forbidden

            return Ok(user);
        }
        [HttpPut("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<bool> UpdateUser(int id, UserDTO user)
        {
            if (id < 0)
            {
                return BadRequest("id must be valid");

            }
            if (user == null || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.HashPassword))
            {
                return BadRequest("Email , username and password are required");
            }
            UserDTO? olduser = meanBuisnessLayer.clsUser.GetUserById(id);
            if (olduser == null)
            {
                return NotFound($"No User Found with ID: {id}");
            }
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var role = User.FindFirstValue(ClaimTypes.Role);

            // If the policy evaluation failed, the user is authenticated
            // but not authorized to access this resource.
            // This correctly returns HTTP 403 Forbidden.
            if (Convert.ToInt32(userId) != id && role != "Admin")
                return Forbid(); // 403 Forbidden
            bool result = meanBuisnessLayer.clsUser.UpdateUser(new UserDTO(id, user.UserName, user.Email, user.HashPassword, "User"));
            if (result)
            {
                return Ok("User Updated");
            }
            else
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Server Side error");
            }
        }

        public class ChangePasswordDTO
        {
            public string OldPassword { get; set; }
            public string NewPassword { get; set; }
        }

        [HttpPost("password/{id}")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public ActionResult<UserDTO> ChangeUserPassword(int id, [FromBody] ChangePasswordDTO dto)
        {
            if (id < 0)
                return BadRequest("id must be valid");

            UserDTO? user = meanBuisnessLayer.clsUser.GetUserById(id);
            if (user == null)
                return NotFound($"No User Found with ID: {id}");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var role = User.FindFirstValue(ClaimTypes.Role);

            if ((Convert.ToInt32(userId) != id && role != "Admin") || user.role == "Admin")
                return Forbid();

            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.HashPassword))
                return BadRequest("Old password is incorrect");

            bool result = meanBuisnessLayer.clsUser.ChangePassword(id, BCrypt.Net.BCrypt.HashPassword(dto.NewPassword));
            if (!result)
                return StatusCode(StatusCodes.Status500InternalServerError, "Server Side error");

            return Ok(user);
        }


        public class EmailUserDTO
        {
            public string Email { get; set; }
            public string UserName { get; set; }
        }

        [HttpPost("password/admin/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Admin")]
        public ActionResult<UserDTO> ChangeAdminUserPassword(int id, [FromBody] ChangePasswordDTO dto)
        {
            if (id < 0)
                return BadRequest("id must be valid");

            UserDTO? user = meanBuisnessLayer.clsUser.GetUserById(id);
            if (user == null)
                return NotFound($"No User Found with ID: {id}");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (Convert.ToInt32(userId) != id)
                return Forbid();

            if (!BCrypt.Net.BCrypt.Verify(dto.OldPassword, user.HashPassword))
                return BadRequest("Old password is incorrect");

            bool result = meanBuisnessLayer.clsUser.ChangePassword(id, BCrypt.Net.BCrypt.HashPassword(dto.NewPassword));
            if (!result)
                return StatusCode(StatusCodes.Status500InternalServerError, "Server Side error");

            return Ok(user);
        }

        [HttpPost("admin/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [ProducesResponseType(StatusCodes.Status403Forbidden)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Authorize(Roles = "Admin")]
        public ActionResult<UserDTO> UpdateAdminCredentialsPassword(int id, [FromBody] EmailUserDTO dto)
        {
            if (id < 0)
                return BadRequest("id must be valid");

            if (string.IsNullOrEmpty(dto.UserName) || string.IsNullOrEmpty(dto.Email))
                return BadRequest("Email and UserName must be valid");

            UserDTO? user = meanBuisnessLayer.clsUser.GetUserById(id);
            if (user == null)
                return NotFound($"No User Found with ID: {id}");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (Convert.ToInt32(userId) != id)
                return Forbid();



            bool result = clsUser.ChangeCreadentials(id, dto.Email, dto.UserName);
            if (!result)
                return StatusCode(StatusCodes.Status500InternalServerError, "Server Side error");

            return Ok(user);
        }
    }
}
