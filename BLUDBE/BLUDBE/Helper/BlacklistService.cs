using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public class BlacklistService
    {
        private readonly List<RevokedToken> _revokedTokens = new List<RevokedToken>();

        public void AddTokenToBlacklist(string token, DateTime? expires)
        {
            _revokedTokens.Add(new RevokedToken
            {
                Token = token,
                Expires = expires,
                Revoked = DateTime.UtcNow
            });
        }

        public bool IsTokenBlacklisted(string token)
        {
            return _revokedTokens.Any(t => t.Token == token && !t.Expires.HasValue);
        }
    }
}
