using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using meanDataAccessLayer.DTO;
using Microsoft.Data.SqlClient;

namespace meanDataAccessLayer
{
    public class Courses
    {

        public static List<CourseDTO>? GetAllCourses()
        {
            string query = @$"SELECT 
    c.id,
    c.name,
    c.description,
    c.price,
    c.imageUrl,
    i.firstName + ' ' + i.lastName AS fullName,
    d.name as  domainName
FROM courses c
INNER JOIN mentors i ON c.mentorId = i.id
INNER JOIN domains d ON c.domainId = d.id";
            List<CourseDTO> mentors = new List<CourseDTO>();

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
                            mentors.Add(new CourseDTO
                            {
                                id = reader["id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["id"]),
                                instructorName = reader["fullName"] == DBNull.Value ? "" : reader["fullName"].ToString(),
                                name = reader["name"] == DBNull.Value ? "" : reader["name"].ToString(),
                                description = reader["description"] == DBNull.Value ? "" : reader["description"].ToString(),
                                domainName = reader["domainName"] == DBNull.Value ? "" : reader["domainName"].ToString(),
                                imageUrl = reader["imageUrl"] == DBNull.Value ? "" : reader["imageUrl"].ToString(),
                                price = reader["price"] == DBNull.Value ? 0 : Convert.ToDouble(reader["price"])
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
        public static CourseDTO? GetCourseById(int id)
        {
            string query = $@"select * from (SELECT 
    c.id,
    c.name,
    c.description,
    c.price,
    c.imageUrl,
    i.firstName + ' ' + i.lastName AS fullName,
    d.name as  domainName
FROM courses c
INNER JOIN mentors i ON c.mentorId = i.id
INNER JOIN domains d ON c.domainId = d.id) as c
where id = @id";

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

                            return new CourseDTO
                            {
                                id = reader["id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["id"]),
                                instructorName = reader["fullName"] == DBNull.Value ? "" : reader["fullName"].ToString(),
                                name = reader["name"] == DBNull.Value ? "" : reader["name"].ToString(),
                                description = reader["description"] == DBNull.Value ? "" : reader["description"].ToString(),
                                domainName = reader["domainName"] == DBNull.Value ? "" : reader["domainName"].ToString(),
                                imageUrl = reader["imageUrl"] == DBNull.Value ? "" : reader["imageUrl"].ToString(),
                                price = reader["price"] == DBNull.Value ? 0 : Convert.ToDouble(reader["price"])
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

            return new CourseDTO(); // not found or error
        }

        public static int? AddNewCourse(CourseDTO Course)
        {
            int domainId = domains.GetDomainIdByName(Course.domainName) ?? 0;
            int mentorId = mentors.GetMentorIdByName(Course.instructorName) ?? 0;
            string query = @"INSERT INTO courses (name, description, price , mentorId , domainId , imageUrl) 
                     OUTPUT INSERTED.id 
                     VALUES (@name, @description, @price , @mentorId , @domainId , @imageUrl)";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@name", Course.name);
                    cmd.Parameters.AddWithValue("@description", Course.description);
                    cmd.Parameters.AddWithValue("@price", Course.price);
                    cmd.Parameters.AddWithValue("@mentorId", mentorId);
                    cmd.Parameters.AddWithValue("@domainId", domainId);
                    cmd.Parameters.AddWithValue("@imageUrl", Course.imageUrl);

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

        public static CourseDTO? UpdateCourse(int id, CourseDTO Course)
        {
            int domainId = domains.GetDomainIdByName(Course.domainName) ?? 0;
            int mentorId = mentors.GetMentorIdByName(Course.instructorName) ?? 0;
            string query = @"Update courses
                             Set name = @name, description = @description, mentorId = @mentorId, price = @price, domainId = @domainId , imageUrl = @imageUrl
                             Where id = @id";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@name", Course.name);
                        cmd.Parameters.AddWithValue("@description", Course.description);
                        cmd.Parameters.AddWithValue("@price", Course.price);
                        cmd.Parameters.AddWithValue("@mentorId", mentorId);
                        cmd.Parameters.AddWithValue("@domainId", domainId);
                        cmd.Parameters.AddWithValue("@imageUrl", Course.imageUrl);
                        cmd.Parameters.AddWithValue("@id", id);
                        connection.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return GetCourseById(id) ?? new CourseDTO();
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
            return new CourseDTO();
        }

    }
}
