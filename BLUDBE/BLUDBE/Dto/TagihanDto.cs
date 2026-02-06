using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class TagihanView
    {
        public long Idtagihan { get; set; }
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
        public Mkegiatan Kegiatan { get; set; }
        public string Notagihan { get; set; }
        public DateTime Tgltagihan { get; set; }
        public long Idkontrak { get; set; }
        public string Uraiantagihan { get; set; }
        public string Bulan { get; set; }
        public int Idbulan { get; set; }
        public string Nofaktur { get; set; }
        public decimal? Nilaippn { get; set; }

        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Kdstatus { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }

        public Kontrak IdkontrakNavigation { get; set; }
        public Stattrs KdstatusNavigation { get; set; }
        public Bulan IdbulanNavigation { get; set; }
    }
    public class TagihandetView
    {
        public long Idtagihandet { get; set; }
        public long Idtagihan { get; set; }
        public long Idrek { get; set; }
        public Daftrekening Rekening { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
