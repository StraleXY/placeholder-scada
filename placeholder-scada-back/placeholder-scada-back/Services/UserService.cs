using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;

namespace placeholder_scada_back.Services;

public interface IUserService
{
    Task<User?> Login(string username, string password);
    Task<bool> Register(string username, string password);
}

public class UserService : IUserService
{

    public required ScadaContext Context { get; set; }

    public UserService(ScadaContext scadaContext) { Context = scadaContext; }

    public async Task<User?> Login(string username, string password)
    {
        User user = await Context.Users.FirstOrDefaultAsync(x => x.Username == username);
        if (user != null && user.Password.Equals(password)) {
            return user;
        }
        return null;
    }

    public async Task<bool> Register(string username, string password)
    {
        User user = await Context.Users.FirstOrDefaultAsync(x => x.Username == username);
        if (user != null)
        {
            return false;
        }
        User newUser = new User(username, password);
        Context.Users.Add(newUser);
        return true;
    }
}