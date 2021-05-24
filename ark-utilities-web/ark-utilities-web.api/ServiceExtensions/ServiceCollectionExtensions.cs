using ark_utilities_web.api.CustomAppSettings;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ark_utilities_web.api.ServiceExtensions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddAppCustomConfig(this IServiceCollection services, IConfiguration config)
        {
            services.Configure<AppCustomConfig>(config.GetSection(AppCustomConfig.AppCustomSettings));

            return services;
        }
    }
}