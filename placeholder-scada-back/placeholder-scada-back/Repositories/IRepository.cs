namespace placeholder_scada_back.Repositories;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAll();
        
    public void Save();
}