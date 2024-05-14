using Microsoft.Extensions.Configuration;
using eventos.Data;
using eventos.Helpers;
using Microsoft.EntityFrameworkCore;

namespace eventos
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddCors();
            services.AddDbContext<UserContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("Default")));
            services.AddControllers();

            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<JwtService>();
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserContext dbContext)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(options => options
                .WithOrigins(new[] { "http://localhost:3000", "http://localhost:8080", "http://localhost:4200" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());
            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            
            // dbContext.Database.EnsureCreated();
            // não usar em conjunto com migrações
            Console.WriteLine("Database created and checked for seeding.");
        }
    }
}