using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meanDataAccessLayer.DTO
{
    public class CourseDTO
    {
        public int id { get; set; }
        public string name { get; set; }
        public string description { get; set; }
        public double price { get; set; }
        public string imageUrl { get; set; }
        public string instructorName { get; set; }
        public string domainName { get; set; }

    }
}
