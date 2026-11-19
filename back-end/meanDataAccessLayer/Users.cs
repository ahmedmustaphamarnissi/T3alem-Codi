using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.Pkcs;
using System.Text;
using System.Threading.Tasks;
using meanDataAccessLayer.DTO;
using Microsoft.Data.SqlClient;

namespace meanDataAccessLayer
{
    public class Users
    {
        public static bool AddUser(UserDTO user)
        {
            string query = "INSERT INTO users (UserName, Email, HashPassword, role) VALUES (@UserName, @Email, @HashPassword, @role)";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@UserName", user.UserName);
                        cmd.Parameters.AddWithValue("@Email", user.Email);
                        cmd.Parameters.AddWithValue("@HashPassword", user.HashPassword);
                        cmd.Parameters.AddWithValue("@role", 0);
                        connection.Open();
                        return cmd.ExecuteNonQuery() > 0;

                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error : " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error" + ex.Message);
            }
            return false;
        }
        public static UserDTO? GetUserByEmail(string email)
        {
            string query = "select * from users where Email=@Email";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@Email", email);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader.Read())
                        {

                            int Id = reader["Id"] == DBNull.Value ? -1 : Convert.ToInt32(reader["Id"]);
                            string UserName = reader["UserName"] == DBNull.Value ? "" : reader["UserName"].ToString();
                            string HashPassword = reader["HashPassword"] == DBNull.Value ? "" : reader["HashPassword"].ToString();
                            string Email = reader["Email"] == DBNull.Value ? "" : reader["Email"].ToString();
                            string role = (reader["role"] != DBNull.Value) ? (Convert.ToBoolean(reader["role"]) == false ? "User" : "Admin") : "User";


                            return new UserDTO(Id, UserName, Email, HashPassword, role);

                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error : " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error" + ex.Message);
            }
            return null;
        }

        public static UserDTO? GetUserById(int id)
        {
            string query = "select * from users where Id=@id";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@id", id);
                        connection.Open();
                        SqlDataReader reader = cmd.ExecuteReader();
                        if (reader.Read())
                        {

                            int Id = reader["Id"] == DBNull.Value ? -1 : Convert.ToInt32(reader["Id"]);
                            string UserName = reader["UserName"] == DBNull.Value ? "" : reader["UserName"].ToString();
                            string HashPassword = reader["HashPassword"] == DBNull.Value ? "" : reader["HashPassword"].ToString();
                            string Email = reader["Email"] == DBNull.Value ? "" : reader["Email"].ToString();
                            string role = (reader["role"] != DBNull.Value) ? (Convert.ToBoolean(reader["role"]) == false ? "User" : "Admin") : "User";


                            return new UserDTO(Id, UserName, Email, HashPassword, role);

                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error : " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error" + ex.Message);
            }
            return null;
        }
        public static bool UpdateUser(UserDTO user)
        {
            string query = "UPDATE users SET UserName=@UserName, Email=@Email, HashPassword=@HashPassword, role=@role WHERE Id=@Id";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@Id", user.Id);
                        cmd.Parameters.AddWithValue("@UserName", user.UserName);
                        cmd.Parameters.AddWithValue("@Email", user.Email);
                        cmd.Parameters.AddWithValue("@HashPassword", user.HashPassword);
                        cmd.Parameters.AddWithValue("@role", 0);
                        connection.Open();
                        return cmd.ExecuteNonQuery() > 0;
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error : " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error" + ex.Message);
            }
            return false;
        }
        public static bool ChangePassword(int id, string Password)
        {
            string query = "UPDATE users SET HashPassword=@HashPassword WHERE Id=@Id";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);
                        cmd.Parameters.AddWithValue("@HashPassword", Password);
                        connection.Open();
                        return cmd.ExecuteNonQuery() > 0;
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error : " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error" + ex.Message);
            }
            return false;
        }

        public static bool ChangeEmailAndUserName(int id, string Email, string UserName)
        {
            string query = "UPDATE users SET UserName=@UserName, Email=@Email WHERE Id=@Id";
            try
            {
                using (SqlConnection connection = new SqlConnection(DataAccessSettings.ConnectionString()))
                {
                    using (SqlCommand cmd = new SqlCommand(query, connection))
                    {
                        cmd.Parameters.AddWithValue("@Id", id);
                        cmd.Parameters.AddWithValue("@Email", Email);
                        cmd.Parameters.AddWithValue("@UserName", UserName);
                        connection.Open();
                        return cmd.ExecuteNonQuery() > 0;
                    }
                }
            }
            catch (SqlException ex)
            {
                Console.WriteLine("DB Error : " + ex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error" + ex.Message);
            }
            return false;
        }
    }
}
