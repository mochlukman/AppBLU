using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class RkarView
    {
        public long Idrkar { get; set; }
        public long? Idrkarx { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idkeg { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Mkegiatan IdkegNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public ICollection<Rkadanar> Rkadanar { get; set; }
        public ICollection<Rkadetr> Rkadetr { get; set; }
        public Rkar Rkarx { get; set; }
    }
    public class RkadetrView
    {
        public long Idrkadetr { get; set; }
        public long Idrkar { get; set; }
        public long Kdnilai { get; set; }
        public string Kdjabar { get; set; }
        public string Uraian { get; set; }
        public decimal? Jumbyek { get; set; }
        public string Satuan { get; set; }
        public decimal? Tarif { get; set; }
        public decimal? Subtotal { get; set; }
        public string Ekspresi { get; set; }
        public bool? Inclsubtotal { get; set; }
        public string Type { get; set; }
        public long? Idstdharga { get; set; }
        public Stdharga StandarHarga { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }
        public long? Idrkadetrduk { get; set; }
    }
    public class RkadanarView
    {
        public long Idrkadanar { get; set; }
        public long? Idrkadanarx { get; set; }
        public long Idrkar { get; set; }
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }
        public Rkar IdrkarNavigation { get; set; }
        public Jdana IdjdanaNavigation { get; set; }
        public Rkadanar Rkadanarx { get; set; }
    }
}
