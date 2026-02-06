using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using BLUDBE.Params;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System.Text;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        public ReportController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ParamReport param)
        {
            // Ambil nilai dari appsettings.json
            var reportPort = _configuration.GetValue<string>("ConnectionStrings:report_port");
            // Bangun URL endpoint target
            var url = $"http://localhost:{reportPort}/reports/getreport";
            try
            {
                // Buat HttpClient menggunakan HttpClientFactory
                var client = _httpClientFactory.CreateClient();

                // Serialisasi parameter ke JSON
                var jsonContent = JsonConvert.SerializeObject(param);
                var content = new StringContent(jsonContent, Encoding.UTF8, "application/json");

                // Kirim permintaan POST ke endpoint
                var response = await client.PostAsync(url, content);

                // Pastikan respons berhasil
                if (response.IsSuccessStatusCode)
                {
                    // Ambil stream dari respons
                    var stream = await response.Content.ReadAsStreamAsync();

                    // Ambil tipe konten dari respons (misalnya "application/pdf")
                    var contentType = response.Content.Headers.ContentType?.ToString() ?? "application/octet-stream";

                    // Kembalikan file sebagai respons
                    return File(stream, contentType);
                }
                else
                {
                    // Kembalikan pesan kesalahan jika respons gagal
                    var errorContent = await response.Content.ReadAsStringAsync();
                    return StatusCode((int)response.StatusCode, new { Success = false, Error = errorContent });
                }
            }
            catch (HttpRequestException ex)
            {
                // Tangani kesalahan HTTP
                return StatusCode(StatusCodes.Status500InternalServerError, new { Success = false, Error = ex.Message });
            }
        }
    }
}