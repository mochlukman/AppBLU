using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public class CoreEndesc2
    {
        public string EncryptString(string inputString, RSAParameters parameters, bool fOAEP)
        {
            byte[] encryptedData;

            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
            {
                rsa.ImportParameters(parameters);

                encryptedData = rsa.Encrypt(Encoding.UTF8.GetBytes(inputString), fOAEP);
            }

            return Convert.ToBase64String(encryptedData);
        }
        public string DecryptString(string inputString, RSAParameters parameters, bool fOAEP)
        {
            byte[] decryptedData;

            using (RSACryptoServiceProvider rsa = new RSACryptoServiceProvider())
            {
                rsa.ImportParameters(parameters);

                decryptedData = rsa.Decrypt(Convert.FromBase64String(inputString), fOAEP);
            }

            return Encoding.UTF8.GetString(decryptedData);
        }

    }
}
