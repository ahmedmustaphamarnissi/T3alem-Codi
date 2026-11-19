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
    public class mentors
    {
        public static List<InstructorDTO>? GetAllMentors()
        {
            string query = "select mentors.id,mentors.cin,mentors.firstName,mentors.lastName,mentors.salary   , domains.name as domainName from mentors inner join domains on mentors.domainId = domains.id and mentors.isActive=1";
            List<InstructorDTO> mentors = new List<InstructorDTO>();

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
                            mentors.Add(new InstructorDTO
                            {
                                id = reader["id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["id"]),
                                firstName = reader["firstName"] == DBNull.Value ? "" : reader["firstName"].ToString(),
                                lastName = reader["lastName"] == DBNull.Value ? "" : reader["lastName"].ToString(),
                                cin = reader["cin"] == DBNull.Value ? "" : reader["cin"].ToString(),
                                domainName = reader["domainName"] == DBNull.Value ? "" : reader["domainName"].ToString(),
                                salary = reader["domainName"] == DBNull.Value ? 0 : Convert.ToDouble(reader["salary"])
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
            }

            return mentors;
        }
        public static bool? DeleteInstructor(int id)
        {
            string query = $"update mentors set isActive=0 where id=@id";

            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {

                    cmd.Parameters.AddWithValue("@id", id);
                    connection.Open();

                    int result = cmd.ExecuteNonQuery();
                    return result > 0;

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
            }

            return false;
        }
        public static InstructorDTO? GetInstructorById(int id)
        {
            string query = "SELECT * FROM mentors WHERE id = @id and isActive=1";

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
                            int domainid = reader["domainId"] == DBNull.Value ? 0 : Convert.ToInt32(reader["domainId"]);
                            return new InstructorDTO
                            {
                                id = reader["id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["id"]),
                                firstName = reader["firstName"] == DBNull.Value ? "" : reader["firstName"].ToString(),
                                lastName = reader["lastName"] == DBNull.Value ? "" : reader["lastName"].ToString(),
                                cin = reader["cin"] == DBNull.Value ? "" : reader["cin"].ToString(),
                                domainName = domains.GetDomainNameById(domainid),
                                salary = reader["salary"] == DBNull.Value ? 0 : Convert.ToDouble(reader["salary"])
                            };
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

            return new InstructorDTO(); // not found or error
        }

        public static int? AddInstructor(InstructorDTO Instructor)
        {
            int domainId = domains.GetDomainIdByName(Instructor.domainName) ?? 0;
            string query = @"INSERT INTO mentors (firstName, lastName, cin , salary , domainId , isActive) 
                     OUTPUT INSERTED.id 
                     VALUES (@FirstName, @LastName, @cin , @salary , @domainId , 1)";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@FirstName", Instructor.firstName);
                    cmd.Parameters.AddWithValue("@LastName", Instructor.lastName);
                    cmd.Parameters.AddWithValue("@cin", Instructor.cin);
                    cmd.Parameters.AddWithValue("@salary", Instructor.salary);
                    cmd.Parameters.AddWithValue("@domainId", domainId);

                    connection.Open();

                    object? result = cmd.ExecuteScalar();
                    return result != null ? Convert.ToInt32(result) : null;
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }

            return null;
        }

        public static InstructorDTO? UpdateInstructor(int id, InstructorDTO Instructor)
        {
            int domainId = domains.GetDomainIdByName(Instructor.domainName) ?? 0;
            string query = @"Update mentors
                             Set firstName = @FirstName, lastName = @LastName, cin = @cin, salary = @salary, domainId = @domainId
                             Where id = @id";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@FirstName", Instructor.firstName);
                        cmd.Parameters.AddWithValue("@LastName", Instructor.lastName);
                        cmd.Parameters.AddWithValue("@cin", Instructor.cin);
                        cmd.Parameters.AddWithValue("@salary", Instructor.salary);
                        cmd.Parameters.AddWithValue("@domainId", domainId);
                        cmd.Parameters.AddWithValue("@id", id);
                        connection.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return GetInstructorById(id) ?? new InstructorDTO();
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
            return new InstructorDTO();
        }

        public static int? GetMentorIdByName(string Name)
        {
            string query = @"select id from mentors where (mentors.firstName + ' ' + mentors.lastName) = @Name";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@Name", Name);


                    connection.Open();

                    object? result = cmd.ExecuteScalar();
                    return result != null ? Convert.ToInt32(result) : null;
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error: " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }

            return null;
        }
    }
}
