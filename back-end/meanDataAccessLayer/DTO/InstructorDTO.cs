using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meanDataAccessLayer.DTO
{
    public class InstructorDTO
    {

        public int id { get; set; }
        public string cin { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public double salary { get; set; }

        public string domainName { get; set; }
    }
}
