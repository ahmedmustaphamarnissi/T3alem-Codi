using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using meanDataAccessLayer.DTO;
using meanProject.DTO;
using Microsoft.Data.SqlClient;

namespace meanDataAccessLayer
{
    public class domains
    {
        public static List<domainDTO>? GetAllDomains()
        {
            string query = "SELECT * FROM domains";
            List<domainDTO> domains = new List<domainDTO>();

            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    connection.Open();
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            domains.Add(new domainDTO
                            {
                                id = reader["id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["id"]),
                                name = reader["name"] == DBNull.Value ? "" : reader["name"].ToString(),
                            });
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                // Log the error (use a logger, or throw, or return empty list)
                Console.WriteLine("DB Error: " + ex.Message);
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
                return new List<domainDTO>();
            }

            return domains;
        }

        public static int? GetDomainIdByName(string name)
        {
            string query = "SELECT id FROM domains WHERE name = @name";

            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@name", name);
                    connection.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            int domainId = reader["id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["id"]);
                            return domainId;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error: " + ex.Message);
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }

            return -1;
        }
        public static string? GetDomainNameById(int? id)
        {
            string query = "SELECT name FROM domains WHERE id = @id";

            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);
                    connection.Open();

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            string domainName = reader["name"] == DBNull.Value ? "" : reader["name"].ToString();
                            return domainName;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error: " + ex.Message);
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }

            return "";
        }
    }
}
