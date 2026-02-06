using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class ParamReport
    {
        [Required]
        public string ReportName { get; set; }

        [Required]
        public ReportType FormatType { get; set; }

        public Dictionary<string, object> Parameters { get; set; }
    }
    public enum ReportType
    {
        Pdf = 1,
        Word = 2,
        Excel = 3,
    }
}
