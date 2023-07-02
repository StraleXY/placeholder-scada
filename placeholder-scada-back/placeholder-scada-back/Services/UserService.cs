using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.DTO;

namespace placeholder_scada_back.Services;

public interface IUserService
{
    Task<User?> Login(CreateUserDto createUserDto);
    Task<bool> Register(CreateUserDto createUserDto);
}

public class UserService : IUserService
{

    public required ScadaContext Context { get; set; }

    public UserService(ScadaContext scadaContext) { Context = scadaContext; }

    public async Task<User?> Login(CreateUserDto createUserDto)
    {
        User user = await Context.Users.FirstOrDefaultAsync(x => x.Username == createUserDto.Username);
        if (user != null && user.Password.Equals(createUserDto.Password)) {
            return user;
        }
        return null;
    }

    public async Task<bool> Register(CreateUserDto createUserDto)
    {
        User user = await Context.Users.FirstOrDefaultAsync(x => x.Username == createUserDto.Username);
        if (user != null)
        {
            return false;
        }
        User newUser = new User(createUserDto.Username, createUserDto.Password, Role.USER);
        Context.Users.Add(newUser);
        Context.SaveChanges();
        return true;
    }
}