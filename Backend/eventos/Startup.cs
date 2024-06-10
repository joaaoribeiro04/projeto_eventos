using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using eventos.Data;
using System;
using Microsoft.Extensions.FileProviders;

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
            services.AddHttpContextAccessor();
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

            // Configuração do serviço de logging
            services.AddLogging(loggingBuilder =>
            {
                loggingBuilder.AddConsole(); // Adiciona o console como destino dos logs
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserContext dbContext, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
                app.UseDeveloperExceptionPage();
            }
            
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine("C:\\Users\\JPMR0\\Desktop\\projeto_eventos\\Backend\\eventos\\Media", "")),
                RequestPath = "/media" // Define o caminho virtual para os arquivos estáticos
            });

            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseCors(options => options
                .WithOrigins("http://localhost:3000")
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials());

            // Adiciona o uso do middleware de sessão
            app.UseSession();

            // Middleware de logging para registrar informações sobre as requisições HTTP
            app.Use(async (context, next) =>
            {
                var logger = loggerFactory.CreateLogger("RequestLogger");

                // Aguarda o processamento da solicitação
                await next();

                // Loga a solicitação
                logger.LogInformation($"Request {context.Request.Method}: {context.Request.Path}");

                // Loga o estado de resposta
                logger.LogInformation($"Response status code: {context.Response.StatusCode}");
            });


            app.UseAuthorization();
            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });

            // dbContext.Database.EnsureCreated();
            // não usar em conjunto com migrações
            Console.WriteLine("Database created and checked for seeding.");
        }
    }
}
