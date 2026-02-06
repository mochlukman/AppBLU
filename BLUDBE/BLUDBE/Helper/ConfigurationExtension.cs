using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace RKPD.API.Helpers
{
    public static class ConfigurationExtension
    {
        public static string SetSuffix(IConfiguration config, string suffix)
        {
            var builder = new SqlConnectionStringBuilder(config.GetConnectionString("default"));

            if (String.IsNullOrEmpty(suffix)) return builder.ToString();

            var db = builder.InitialCatalog;
            string[] db_split = db.Split("_");
            if (db_split.Count() == 3)
            {
                builder.InitialCatalog = $"{db_split[0]}_{suffix}_{db_split[2]}";
            } else
            {
                builder.InitialCatalog = $"{db_split[0]}_{suffix}";
            }
            

            return builder.ToString();
        }
    }
}
