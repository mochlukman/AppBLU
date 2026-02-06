using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    //pendapatan
    public class DpadView
    {
        public long Iddpad { get; set; }
        public long Iddpa { get; set; }
        public string Kdtahap { get; set; }
        public long Idrek { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Dpa Dpa { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class DpadetdView
    {
        public long Iddpadetd { get; set; }
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
        public Stdharga StandarHarga { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iddpadetdduk { get; set; }
        public long? Idsatuan { get; set; }
        public Jsatuan Jsatuan { get; set; }
    }
    public class DpablndView
    {
        public long Iddpablnd { get; set; }
        public long Iddpad { get; set; }
        public long Idbulan { get; set; }
        public string Ketbulan { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    //pembiayaan
    public class DpabView
    {
        public long Iddpab { get; set; }
        public long Iddpa { get; set; }
        public string Kdtahap { get; set; }
        public long Idrek { get; set; }
        public Daftrekening Rekening { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class DpadetbView
    {
        public long Iddpadetb { get; set; }
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
        public Stdharga StandarHarga { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iddpadetdduk { get; set; }
        public long? Idsatuan { get; set; }
        public Jsatuan Jsatuan { get; set; }
    }
    public class DpablnbView
    {
        public long Iddpablnb { get; set; }
        public long Iddpab { get; set; }
        public long Idbulan { get; set; }
        public string Ketbulan { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    //belaja
    public class DparView
    {
        public long Iddpar { get; set; }
        public long Iddpa { get; set; }
        public string Kdtahap { get; set; }
        public long Idkeg { get; set; }
        public Mkegiatan Kegiatan { get; set; }
        public long Idrek { get; set; }
        public Daftrekening Rekening { get; set; }
        public decimal? Nilai { get; set; }
        public decimal? UpGu { get; set; }
        public decimal? Ls { get; set; }
        public decimal? Tu { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
    public class DpadetrView
    {
        public long Iddpadetr { get; set; }
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
        public Stdharga StandarHarga { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
        public long? Iddpadetrduk { get; set; }
        public long? Idsatuan { get; set; }
        public Jsatuan Jsatuan { get; set; }
    }
    public class DpablnrView
    {
        public long Iddpablnr { get; set; }
        public long Iddpar { get; set; }
        public long Idbulan { get; set; }
        public string Ketbulan { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Datecreate { get; set; }
        public DateTime? Dateupdate { get; set; }
    }
}
