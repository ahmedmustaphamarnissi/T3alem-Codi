using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using meanDataAccessLayer.DTO;

namespace meanBuisnessLayer
{
    public class clsDomains
    {
        public static List<domainDTO> GetDomains()
        {
            return meanDataAccessLayer.domains.GetAllDomains() ?? new List<domainDTO>();
        }
    }
}
