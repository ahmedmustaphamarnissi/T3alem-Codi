using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using meanDataAccessLayer;
using meanDataAccessLayer.DTO;

namespace meanBuisnessLayer
{
    public class clsUser
    {
        public static bool AddNewUser(ref UserDTO user)
        {
            user.HashPassword = BCrypt.Net.BCrypt.HashPassword(user.HashPassword);
            user.role = "User";
            return Users.AddUser(user);
        }
        public static UserDTO? GetUserByEmail(string email)
        {
            UserDTO? user = Users.GetUserByEmail(email);
            if (user == null)
                return null;
            if (user.Id == -1 || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.HashPassword) || string.IsNullOrEmpty(user.role))
            {
                return new UserDTO();
            }
            return user;

        }
        public static UserDTO? GetUserById(int id)
        {
            UserDTO? user = Users.GetUserById(id);
            if (user == null)
                return null;
            if (user.Id == -1 || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.HashPassword) || string.IsNullOrEmpty(user.role))
            {
                return new UserDTO();
            }
            return user;

        }
        public static bool UpdateUser(UserDTO user)
        {
            if (user.Id == -1 || string.IsNullOrEmpty(user.Email) || string.IsNullOrEmpty(user.UserName) || string.IsNullOrEmpty(user.HashPassword) || string.IsNullOrEmpty(user.role))
            {
                return false;
            }
            user.HashPassword = BCrypt.Net.BCrypt.HashPassword(user.HashPassword);
            user.role = "User";

            return Users.UpdateUser(user);
        }
        public static bool ChangePassword(int id, string newPassword)
        {
            return Users.ChangePassword(id, newPassword);
        }

        public static bool ChangeCreadentials(int id, string newEmail, string newUserName)
        {
            return Users.ChangeEmailAndUserName(id, newEmail, newUserName);
        }
    }
}
