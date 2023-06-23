using Microsoft.EntityFrameworkCore;
using placeholder_scada_back.Entities;

namespace placeholder_scada_back.Context;

public class ScadaContext : DbContext
{
    public DbSet<AnalogInput> AnalogInputs { get; set; }
    public DbSet<AnalogOutput> AnalogOutputs { get; set; }
    public DbSet<DigitalInput> DigitalInputs { get; set; }
    public DbSet<DigitalOutput> DigitalOutputs { get; set; }

    public DbSet<User> Users { get; set; }

    public ScadaContext(DbContextOptions options) : base(options)
    {
        this.ChangeTracker.LazyLoadingEnabled = false;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
    }
}