namespace meanProject.DTO
{

    public class StudentDTO
    {
        public StudentDTO()
        {
            this.Id = -1;
            this.FirstName = "";
            this.LastName = "";
            this.Email = "";
            this.age = -1;
            this.phone = "";

        }
        public StudentDTO(int id, string firstname, string lastname, string email, int age, string phone)
        {
            this.Id = id;
            this.FirstName = firstname;
            this.LastName = lastname;
            this.Email = email;
            this.age = age;
            this.phone = phone;
        }
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public int age { get; set; }
        public string phone { get; set; }
    }


}
