using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public static class DapperConnection
    {
        public static string GetConnection(IConfiguration config)
        {
            var builder = new SqlConnectionStringBuilder(config.GetConnectionString("dapper"));
            return builder.ToString();
        }
    }
}
