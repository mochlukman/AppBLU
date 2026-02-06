using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BLUDBE.Helper
{
    public class Npwp
    {
        public static string RemoveSpecialCharacters(string str)
        {
            StringBuilder sb = new StringBuilder();
            foreach (char c in str)
            {
                if ((c >= '0' && c <= '9'))
                {
                    sb.Append(c);
                }
            }
            return sb.ToString();
        }
        public static string Format(string no)
        {
            var format = no[0] + "" + no[1] + "." + no[2] + "" + no[3] + "" + no[4] + "." + no[5] + "" + no[6] + "" + no[7] + "." + no[8] + "-" + no[9] + "" + no[10] + "" + no[11] + "." + no[12] + "" + no[13] + "" + no[14];
            return format.ToString();
        }
    }
}
