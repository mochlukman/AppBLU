using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public class CoreEndesc
    {
        public string EncryptString(string originalString, byte[] bytes)
        {
            if (String.IsNullOrEmpty(originalString))
            {
                throw new ArgumentNullException("The string which needs to be encrypted can not be null.");
            }

            using (DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider())
            {
                using (MemoryStream memoryStream = new MemoryStream())
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateEncryptor(bytes, bytes), CryptoStreamMode.Write))
                    {

                        using (StreamWriter writer = new StreamWriter(cryptoStream))
                        {
                            writer.Write(originalString);
                            writer.Flush();
                            cryptoStream.FlushFinalBlock();
                            writer.Flush();

                            return Convert.ToBase64String(memoryStream.GetBuffer(), 0, (int)memoryStream.Length);
                        }
                    }
                }
            }
        }

        public string DecryptString(String cryptedString, byte[] bytes)
        {
            if (String.IsNullOrEmpty(cryptedString))
            {
                throw new ArgumentNullException("The string which needs to be decrypted can not be null.");
            }

            String deCrypted = "";
            using (DESCryptoServiceProvider cryptoProvider = new DESCryptoServiceProvider())
            {
                using (MemoryStream memoryStream = new MemoryStream(Convert.FromBase64String(cryptedString)))
                {
                    using (CryptoStream cryptoStream = new CryptoStream(memoryStream, cryptoProvider.CreateDecryptor(bytes, bytes), CryptoStreamMode.Read))
                    {
                        using (StreamReader reader = new StreamReader(cryptoStream))
                        {
                            deCrypted = reader.ReadToEnd();
                        }
                    }
                }
            }

            return deCrypted;
        }
    }
}
