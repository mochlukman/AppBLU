using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Ssh
    {
        public Ssh()
        {
            Dpadetr = new HashSet<Dpadetr>();
            Rkadetr = new HashSet<Rkadetr>();
            Sshrek = new HashSet<Sshrek>();
        }

        public long Idssh { get; set; }
        public long? Idbrg { get; set; }
        public string Kdssh { get; set; }
        public string Kode { get; set; }
        public string Uraian { get; set; }
        public string Spek { get; set; }
        public string Satuan { get; set; }
        public string Kdsatuan { get; set; }
        public decimal? Harga { get; set; }
        public string Kelompok { get; set; }
        public DateTime? Createddate { get; set; }
        public string Createdby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Daftbarang IdbrgNavigation { get; set; }
        public Jsatuan KdsatuanNavigation { get; set; }
        public ICollection<Dpadetr> Dpadetr { get; set; }
        public ICollection<Rkadetr> Rkadetr { get; set; }
        public ICollection<Sshrek> Sshrek { get; set; }
    }
}
