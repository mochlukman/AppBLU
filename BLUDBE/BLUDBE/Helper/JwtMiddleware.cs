using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BLUDBE.Helper
{
    public class JwtMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;
        private readonly BlacklistService _blacklistService;

        public JwtMiddleware(RequestDelegate next, IConfiguration configuration, BlacklistService blacklistService)
        {
            _next = next;
            _configuration = configuration;
            _blacklistService = blacklistService;
        }

        public async Task Invoke(HttpContext context)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault()?.Split(" ").Last();

            if (token != null)

            {
                try
                {
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["Token:Key"]));

                    tokenHandler.ValidateToken(token, new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,

                        IssuerSigningKey = key
                    }, out SecurityToken validatedToken);

                    var jwtSecurityToken = (JwtSecurityToken)validatedToken;
                    var userId = jwtSecurityToken.Claims.FirstOrDefault(c => c.Type == "nameid")?.Value;

                    // Check if the token is blacklisted
                    if (_blacklistService.IsTokenBlacklisted(token))
                    {
                        // Token is blacklisted, return unauthorized
                        context.Response.StatusCode = 401;
                        return;
                    }

                    // Attach the user to the context on successful validation
                    context.Items["User"] = userId;
                }
                catch (Exception ex)
                {
                    // Token is invalid, return unauthorized
                    context.Response.StatusCode = 401;
                    return;
                }
            }

            await _next(context);
        }
    }
}
