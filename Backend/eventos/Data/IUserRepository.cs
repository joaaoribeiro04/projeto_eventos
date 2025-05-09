using Eventos.Models;

namespace eventos.Data;

public interface IUserRepository
{
    User Create(User user);
    User GetByEmail(string email);
}