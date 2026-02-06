using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using BLUDBE.Helper;

namespace BLUDBE.Middleware
{
    public class CheckActivationMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<CheckActivationMiddleware> _logger;
        public IConfiguration Configuration { get; }
        private readonly DapperService _dapperService;
        public CheckActivationMiddleware(RequestDelegate next, ILogger<CheckActivationMiddleware> logger, IConfiguration configuration, DapperService dapperService)
        {
            _next = next;
            _logger = logger;
            Configuration = configuration;
            _dapperService = dapperService;
        }

        public async Task Invoke(HttpContext context)
        {
            context.Request.EnableBuffering();
            CpuId cpuId = new CpuId();
            string path = context.Request.Path;
            if (path.Contains("api"))
            {
                if(path == "/api/Activate" || path == "/api/Activate/GetCPUID")
                {
                    await _next(context);
                    return;
                } else
                {
                    bool isExistActivateTable = _dapperService.CheckActivateTable();
                    if (!isExistActivateTable)
                    {
                        await CpuNotFound(context, cpuId.GetCpuId());
                        return;
                    }
                    if (!_dapperService.isExistCPUID(cpuId.GetCpuId(), _dapperService._namaAplikasi))
                    {
                        await CpuNotFound(context, cpuId.GetCpuId());
                        return;
                    }
                    await _next(context);
                    return;
                }
            } else
            {
                await _next(context);
                return;
            }
        }
        public async Task CpuNotFound(HttpContext context, string cpuid)
        {
            if (!context.Response.HasStarted)
            {
                context.Response.StatusCode = StatusCodes.Status404NotFound;
                context.Response.ContentType = "application/json; charset=utf-8";

                var errorMessage = new
                {
                    error = "Not Active",
                    message = $"CPUID : {cpuid}, Silakan Hubungi Administrator Untuk Melakukan Aktivasi",
                    error_id = "not_active"
                };

                var json = JsonConvert.SerializeObject(errorMessage);
                context.Response.ContentLength = Encoding.UTF8.GetByteCount(json);
                await context.Response.WriteAsync(json, Encoding.UTF8);
            }
        }
    }
}
