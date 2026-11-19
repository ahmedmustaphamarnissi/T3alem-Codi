using meanDataAccessLayer.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace meanProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DomainController : ControllerBase
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public ActionResult<List<domainDTO>> GetAllDomains()
        {
            List<domainDTO>? domains = meanBuisnessLayer.clsDomains.GetDomains();
            if (domains == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            if (domains.Count == 0)
            {
                return NotFound("No Domains Found!");
            }
            return Ok(domains);
        }
    }
}
