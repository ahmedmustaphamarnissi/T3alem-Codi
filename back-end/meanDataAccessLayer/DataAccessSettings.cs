using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meanDataAccessLayer
{
    internal class DataAccessSettings
    {
        public static string ConnectionString()
        {
            string? DataBaseId = Environment.GetEnvironmentVariable("DB_ID");
            string? DataBasePassword = Environment.GetEnvironmentVariable("DB_Password");

            if (DataBaseId == null || DataBasePassword == null)
            {
                throw new Exception("Database credentials are not set in environment variables.");

            }
            else
            {
                return $"Server=.;Database=mean;User Id={DataBaseId};Password={DataBasePassword};TrustServerCertificate=True;";
            }
        }
    }
}
