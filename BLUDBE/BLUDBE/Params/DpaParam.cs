using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class DpaGet
    {
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
    }
    public class DpaPost
    {
        public long Iddpa { get; set; }
        [Required]
        public long Idunit { get; set; }
        public int? Jdpa { get; set; }
        public string Nodpa { get; set; }
        public DateTime? Tgldpa { get; set; }
        public string Nosah { get; set; }
        public string Keterangan { get; set; }
        public DateTime? Tglsah { get; set; }
        public bool? Sah { get; set; }
        public DateTime? Tglvalid { get; set; }
        public bool? Valid { get; set; }
        public string Kdtahap { get; set; }
        public int? Idxkode { get; set; }
        public long Idkeg { get; set; }
        public decimal? Pendapatan { get; set; }
        public decimal? Belanja { get; set; }
        public decimal? Pembiayaantr { get; set; }
        public decimal? Pembiayaankr { get; set; }
    }
    public class DpaUpdateNilai
    {
        [Required]
        public long Iddpa { get; set; }
        public decimal? Pendapatan { get; set; }
        public decimal? Belanja { get; set; }
        public decimal? Pembiayaantr { get; set; }
        public decimal? Pembiayaankr { get; set; }
    }
    public class DparPost
    {
        public long Iddpar { get; set; }
        [Required]
        public long Iddpa { get; set; }
        [Required]
        public string Kdtahap { get; set; }
        [Required]
        public long Idkeg { get; set; }
        [Required]
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public decimal? UpGu { get; set; }
        public decimal? Ls { get; set; }
        public decimal? Tu { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    //post detail
    public class DpadetdPost
    {
        public long Iddpadetd { get; set; }
        [Required]
        public long Iddpad { get; set; }
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
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iddpadetdduk { get; set; }
        public long? Idsatuan { get; set; }
    }
    public class DpadetbPost
    {
        public long Iddpadetb { get; set; }
        [Required]
        public long Iddpab { get; set; }
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
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iddpadetbduk { get; set; }
        public long? Idsatuan { get; set; }
    }
    public class DpadetrPost
    {
        public long Iddpadetr { get; set; }
        [Required]
        public long Iddpar { get; set; }
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
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iddpadetrduk { get; set; }
        public long? Idsatuan { get; set; }
    }
    public class DpadanarPost
    {
        public long Iddpadanar { get; set; }
        [Required]
        public long Iddpar { get; set; }
        [Required]
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class DpaRekGet
    {
        public long Iddpa { get; set; }
        public string Kdtahap { get; set; }
        public long Idunit { get; set; }
        public long Idskp { get; set; }
        public long Idtbp { get; set; }
        public long Idsts { get; set; }
    }
    public class DpadUpdate
    {
        public long Iddpad { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class DpabUpdate
    {
        public long Iddpab { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class DparUpdate
    {
        public long Iddpar { get; set; }
        public decimal? Nilai { get; set; }
    }
}
