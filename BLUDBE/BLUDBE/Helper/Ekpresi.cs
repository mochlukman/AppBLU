using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace RKPD.API.Helpers
{
    public class Ekpresi
    {
        public static double ParseEkspresi(string expresi)
        {
            double n = 0;
            try
            {
                string temp = expresi.Trim().ToLower().Replace(".", ",");
                string exp = "";
                for (int i = 0; i < temp.Length; i++)
                {
                    char ch = temp[i];
                    if (char.IsDigit(ch))
                    {
                        exp += ch;
                    }
                    else
                    {
                        switch (ch)
                        {
                            case '(':
                            case ')':
                            case '/':
                            case '+':
                            case '-':
                            case '*':
                            case '.':
                            case ',':
                            case 'x': exp += ch; break;
                        }

                    }
                }
                n = evaluate(ToSimpleExp(exp));
            }
            catch (Exception)
            {
            }
            return n;
        }
        public static double evaluate(string s_exp)
        {
            string[] l_ops = new string[] { "+", "x", "*", "-", "/" };
            double N;

            MatchCollection mc = Regex.Matches(s_exp, "[-|+|x|*|/]");
            string[] ops = new string[mc.Count];
            for (int i = 0; i < ops.Length; i++)
            {
                ops[i] = mc[i].Value;
            }

            string[] nbrs = Regex.Split(s_exp, "[-|+|x|*|/]");

            double[] dbls = new double[nbrs.Length];
            for (int i = 0; i < dbls.Length; i++)
            {
                dbls[i] = double.Parse(nbrs[i]);
            }


            N = dbls[0];
            for (int i = 1; i < dbls.Length; i++)
            {
                switch (ops[i - 1])
                {
                    case "+":
                        N += dbls[i];
                        break;
                    case "*":
                    case "x":
                        N *= dbls[i];
                        break;
                    case "-":
                        N -= dbls[i];
                        break;
                    case "/":
                        N /= dbls[i];
                        break;
                }
            }
            return N;
        }
        private static string ToSimpleExp(string exp)
        {
            if ((exp.IndexOf("(") == -1) && (exp.IndexOf(")") == -1))
            {
                return evaluate(exp).ToString();
            }
            else
            {
                MatchCollection mc = Regex.Matches(exp, "\\([0-9+x*-/]+\\)");
                for (int i = 0; i < mc.Count; i++)
                {
                    string str = mc[i].Value;
                    str = str.Substring(1, str.Length - 2);
                    string nstr = ToSimpleExp(str);
                    exp = exp.Replace(mc[i].Value, nstr);
                }
                return ToSimpleExp(exp);
            }
        }
    }
}
