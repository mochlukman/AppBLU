using Dapper;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public class DapperService
    {
        private readonly string _connectionString;
        private SqlConnection _connection;
        public string _namaAplikasi { get; set; }
        public DapperService(IConfiguration configuration)
        {
            //_connectionString = configuration.GetConnectionString("dapper");
            var builder = new SqlConnectionStringBuilder(configuration.GetConnectionString("dapper"));
            var db = builder.InitialCatalog;
            string[] db_split = db.Split("_");
            builder.InitialCatalog = $"V@LIDSECAPP";
            _connectionString = builder.ToString();
            _namaAplikasi = configuration.GetSection("Aplikasi").Value;
        }

        private SqlConnection CreateConnection()
        {
            return new SqlConnection(_connectionString);
        }
        public bool CheckActivateTable()
        {
            try
            {
                using (var connection = CreateConnection()) // New connection for each use
                {
                    connection.Open();
                    string query = "SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @TableName";
                    int count = connection.ExecuteScalar<int>(query, new { TableName = "ACTIVEAPP" });
                    return count > 0;
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error drop table: {ex.Message}");
                return false;
            }

        }
        public void DropTable()
        {
            try
            {
                using (var connection = CreateConnection()) // New connection for each use
                {
                    connection.Open();
                    string query = "DROP TABLE IF EXISTS [dbo].[ACTIVEAPP]";
                    connection.Execute(query);
                }
            }
            catch (Exception ex)
            {
                // Log or handle exception
                Console.WriteLine($"Error drop table: {ex.Message}");
            }
        }
        public bool CreateTable()
        {
            try
            {
                using (var connection = CreateConnection()) // New connection for each use
                {
                    connection.Open();
                    string query = @"
                        DROP TABLE IF EXISTS [dbo].[ACTIVEAPP]
                        SET ANSI_NULLS ON
                        SET QUOTED_IDENTIFIER ON
                        CREATE TABLE [dbo].[ACTIVEAPP](
	                        [CPUID] [varchar](20) NOT NULL,
                            [APLIKASI] [varchar](50) NOT NULL,
	                        [SERIAL] [text] NOT NULL,
                            [PUBLICKEY] [text] NOT NULL,
	                        [TIPE] [varchar](50) NOT NULL,
	                        [TGLBERLAKU] [datetime] NULL,
	                        [DATECREATE] [datetime] NULL,
	                        [DATEUPDATE] [datetime] NULL,
                         CONSTRAINT [PK_ACTIVEAPP] PRIMARY KEY CLUSTERED 
                        (
	                        [CPUID] ASC,
	                        [APLIKASI] ASC
                        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
                        ) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
                    ";
                    connection.Execute(query);
                    // Check if table exists after creation
                    var tableExists = connection.ExecuteScalar<int>("SELECT COUNT(*) FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = @TableName", new { TableName = "ACTIVEAPP" }) > 0;

                    return tableExists;
                }
            }
            catch (Exception ex)
            {
                // Log or handle exception
                Console.WriteLine($"Error creating table: {ex.Message}");
                return false;
            }
        }
        public bool InsertDataIntoTable(string tableName, ActiveAppModel data)
        {
            try
            {
                using (var connection = CreateConnection()) // New connection for each use
                {
                    connection.Open();
                    // Generate SQL query for insertion
                    string columns = string.Join(",", ((object)data).GetType().GetProperties().Select(x => x.Name));
                    string parameters = string.Join(",", ((object)data).GetType().GetProperties().Select(x => "@" + x.Name));
                    string query = $"INSERT INTO {tableName} ({columns}) VALUES ({parameters})";

                    // Execute insertion query
                    int rowsAffected = connection.Execute(query, (object)data);

                    // Check if insertion was successful
                    return rowsAffected > 0;
                }

                
            }
            catch (Exception ex)
            {
                // Log or handle exception
                Console.WriteLine($"Error inserting data: {ex.Message}");
                return false;
            }
        }
        public ActiveAppModel getByCPUID(string cpuid, string aplikasi)
        {
            try
            {
                using (var connection = CreateConnection()) // New connection for each use
                {
                    connection.Open();
                    string query = "SELECT * FROM ACTIVEAPP WHERE CPUID = @CPUID AND APLIKASI = @APLIKASI";
                    return connection.QueryFirstOrDefault<ActiveAppModel>(query, new { CPUID = cpuid, APLIKASI = aplikasi });
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inserting data: {ex.Message}");
                return null;
            }
        }
        public bool isExistCPUID(string cpuid, string aplikasi)
        {
            try
            {
                using (var connection = CreateConnection()) // New connection for each use
                {
                    connection.Open();
                    string query = "SELECT COUNT(1) FROM ACTIVEAPP WHERE CPUID = @CPUID AND APLIKASI = @APLIKASI";
                    int count = connection.QueryFirstOrDefault<int>(query, new { CPUID = cpuid, APLIKASI = aplikasi });
                    return count > 0;
                }
                
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error inserting data: {ex.Message}");
                return false;
            }
        }

        public void Dispose()
        {
            if (_connection != null && _connection.State != ConnectionState.Closed)
            {
                _connection.Close();
                _connection.Dispose();
            }
        }
    }
}
