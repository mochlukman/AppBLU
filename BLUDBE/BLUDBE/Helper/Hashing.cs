using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace RKPD.API.Helpers
{
    public class Hashing
    {
        public static string Create(string str)
        {
            var md5 = new MD5CryptoServiceProvider();
            var encoding = Encoding.GetEncoding("Windows-1252");
            var result = md5.ComputeHash(encoding.GetBytes(str));
            return encoding.GetString(result);
        }
        public static bool Check(string str, string hashPwd)
        {
            return Create(str) == hashPwd.Trim();
        }
    }
}
