using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class SshGet
    {
        public long Idssh { get; set; }
        public long? Idbrg { get; set; }
        public string Kdssh { get; set; }
        public string Kode { get; set; }
        public string Uraian { get; set; }
        public string Spek { get; set; }
        public string Satuan { get; set; }
        public string Kdsatuan { get; set; }
        public decimal? Harga { get; set; }
        [Required]
        public string Kelompok { get; set; }
    }
    public class SshPost
    {
        public long Idssh { get; set; }
        public long? Idbrg { get; set; }
        [Required]
        public string Kdssh { get; set; }
        public string Kode { get; set; }
        public string Uraian { get; set; }
        public string Spek { get; set; }
        public string Satuan { get; set; }
        public string Kdsatuan { get; set; }
        public decimal? Harga { get; set; }
        [Required]
        public string Kelompok { get; set; }
    }
}
