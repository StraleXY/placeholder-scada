using placeholder_scada_back.Entities;
using placeholder_scada_back.Context;
using Microsoft.EntityFrameworkCore;

namespace placeholder_scada_back.Services;

public interface ITagService
{
}

public class TagService : ITagService
{

    public required ScadaContext Context { get; set; }

    public TagService(ScadaContext scadaContext) { Context = scadaContext; }

}