using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace meanDataAccessLayer.DTO
{
    public class UserDTO
    {
        public UserDTO()
        {
            this.role = "User";
            this.Email = "";
            this.UserName = "";
            this.HashPassword = "";
            this.Id = -1;
        }
        public UserDTO(int id, string userName, string email, string hashPassword, string role)
        {
            Id = id;
            UserName = userName;
            Email = email;
            HashPassword = hashPassword;
            this.role = role;
        }
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string HashPassword { get; set; }
        public string role { get; set; }
    }
}
