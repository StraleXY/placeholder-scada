namespace placeholder_scada_back.Services;

public interface IService<T> where T : class 
{
    Task<IEnumerable<T>> GetAll();
}