using placeholder_scada_back.Context;
using placeholder_scada_back.Services;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();


builder.Services.AddControllers().AddJsonOptions(x =>
                x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles);
//builder.Services.AddControllers().AddJsonOptions(x =>
//   x.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve);


//Repositories
//builder.Services.AddTransient<IAntiTrollRepository, AntiTrollRepository>();
builder.Services.AddTransient<IUserService, UserService>();

// var connectionString = builder.Configuration.GetConnectionString("HealthCareConnection");
// builder.Services.AddDbContext<HealthCareContext>(x => x.UseSqlServer(connectionString));
// //builder.Services.AddDbContext<HealthCareContext>(x => x.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking));
// builder.Services.AddDbContext<HealthCareContext>(x => x.EnableSensitiveDataLogging());

var connectionString = builder.Configuration.GetConnectionString("PlaceholderScadaConnection");
builder.Services.AddDbContext<ScadaContext>(x => x.UseSqlServer(connectionString));
builder.Services.AddDbContext<ScadaContext>(x => x.EnableSensitiveDataLogging());


var app = builder.Build();

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();
app.UseCors("CorsPolicy");
app.UseAuthorization();
app.UseEndpoints(endpoints => endpoints.MapControllers());
//app.MapRazorPages();

app.Run();
