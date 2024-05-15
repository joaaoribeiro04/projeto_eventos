using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using eventos.Data;

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
            services.AddDistributedMemoryCache();
            
            services.AddHttpContextAccessor();

    
            services.AddSession(options =>
            {
                options.Cookie.IsEssential = true; // torna o cookie da sessão essencial
            });
    
            // Outros serviços
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddCors();
            services.AddDbContext<UserContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("Default")));
            
            // Configuração do contexto EventContext
            services.AddDbContext<EventContext>(options =>
                options.UseNpgsql(Configuration.GetConnectionString("Default")));

            services.AddControllers();

            services.AddScoped<IUserRepository, UserRepository>();
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
                .WithOrigins(new[] { "http://localhost:3000" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

            // Adiciona o uso do middleware de sessão
            app.UseSession();

            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
            
            // dbContext.Database.EnsureCreated();
            // não usar em conjunto com migrações
            Console.WriteLine("Database created and checked for seeding.");
        }
    }
}
