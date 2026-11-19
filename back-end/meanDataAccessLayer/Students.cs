using meanProject.DTO;
using Microsoft.Data.SqlClient;

namespace meanDataAccessLayer
{
    public class Students
    {
        public static List<StudentDTO>? GetAllStudents()
        {
            string query = "SELECT * FROM students";
            List<StudentDTO> students = new List<StudentDTO>();

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
                            students.Add(new StudentDTO
                            {
                                Id = reader["Id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["Id"]),
                                FirstName = reader["FirstName"] == DBNull.Value ? "" : reader["FirstName"].ToString(),
                                LastName = reader["LastName"] == DBNull.Value ? "" : reader["LastName"].ToString(),
                                Email = reader["Email"] == DBNull.Value ? "" : reader["Email"].ToString(),
                                age = reader["age"] == DBNull.Value ? 0 : Convert.ToInt32(reader["age"]),
                                phone = reader["phone"] == DBNull.Value ? "" : reader["phone"].ToString()
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

            return students;
        }
        public static StudentDTO? GetStudentById(int id)
        {
            string query = "SELECT * FROM students WHERE id = @id";

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
                            return new StudentDTO
                            {
                                Id = reader["Id"] == DBNull.Value ? 0 : Convert.ToInt32(reader["Id"]),
                                FirstName = reader["FirstName"] == DBNull.Value ? "" : reader["FirstName"].ToString(),
                                LastName = reader["LastName"] == DBNull.Value ? "" : reader["LastName"].ToString(),
                                Email = reader["Email"] == DBNull.Value ? "" : reader["Email"].ToString(),
                                age = reader["age"] == DBNull.Value ? 0 : Convert.ToInt32(reader["age"]),
                                phone = reader["phone"] == DBNull.Value ? "" : reader["phone"].ToString()
                            };
                        }
                    }
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

            return null; // not found or error
        }
        public static int? AddStudent(StudentDTO student)
        {
            string query = @"INSERT INTO students (FirstName, LastName, Email, age, phone) 
                     OUTPUT INSERTED.Id 
                     VALUES (@FirstName, @LastName, @Email, @age, @phone)";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@FirstName", student.FirstName);
                    cmd.Parameters.AddWithValue("@LastName", student.LastName);
                    cmd.Parameters.AddWithValue("@Email", student.Email);
                    cmd.Parameters.AddWithValue("@age", student.age);
                    cmd.Parameters.AddWithValue("@phone", student.phone);

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

        public static StudentDTO? UpdateStudent(int id, StudentDTO student)
        {
            string query = @"Update students
                             Set FirstName = @FirstName, LastName = @LastName, Email = @Email, age = @age, phone = @phone
                             Where Id = @id";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@FirstName", student.FirstName);
                        cmd.Parameters.AddWithValue("@LastName", student.LastName);
                        cmd.Parameters.AddWithValue("@Email", student.Email);
                        cmd.Parameters.AddWithValue("@age", student.age);
                        cmd.Parameters.AddWithValue("@phone", student.phone);
                        cmd.Parameters.AddWithValue("@id", id);
                        connection.Open();
                        int rowsAffected = cmd.ExecuteNonQuery();
                        if (rowsAffected > 0)
                        {
                            return GetStudentById(id) ?? new StudentDTO();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error: " + ex.Message);
            }
            return null;
        }
        public static int? DeleteStudent(int id)
        {
            string query = @"DELETE FROM students
                 OUTPUT DELETED.Id
                 WHERE id = @id";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                using (SqlCommand cmd = new SqlCommand(query, connection))
                {
                    cmd.Parameters.AddWithValue("@id", id);
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
