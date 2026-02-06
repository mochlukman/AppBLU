using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class RkaGlobalGet
    {
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idrek{ get; set; }
        public long Idkeg { get; set; }
        public int Trkr { get; set; }
        public long Idpeg { get; set; }
    }
    public class RkadUpdate
    {
        public long Idrkad { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class RkarUpdate
    {
        public long Idrkar { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class RkabUpdate
    {
        public long Idrkab { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class RkadPost
    {
        [Required]
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
    }
    public class RkarPost
    {
        [Required]
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        [Required]
        public long Idkeg { get; set; }
    }
    public class RkabPost
    {
        [Required]
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        [Required]
        public int Trkr { get; set; }
    }
    public class RkadetdGet
    {
        public long Idrkad { get; set; }
    }
    public class RkadetrGet
    {
        public long Idrkar { get; set; }
    }
    public class RkadetbGet
    {
        public long Idrkab { get; set; }
    }
    public class RkadetdPost
    {
        public long Idrkadetd { get; set; }
        [Required]
        public long Idrkad { get; set; }
        public string Kdjabar { get; set; }
        public string Uraian { get; set; }
        public string Satuan { get; set; }
        public decimal? Tarif { get; set; }
        public string Ekspresi { get; set; }
        public string Type { get; set; }
        public long? Idrkadetdduk { get; set; }
    }
    public class RkadetrPost
    {
        public long Idrkadetr { get; set; }
        [Required]
        public long Idrkar { get; set; }
        public string Kdjabar { get; set; }
        public string Uraian { get; set; }
        public string Satuan { get; set; }
        public decimal? Tarif { get; set; }
        public string Ekspresi { get; set; }
        [Required]
        public string Type { get; set; }
        public long? Idrkadetrduk { get; set; }
        public long? Idssh { get; set; }
        public long? Idjdana { get; set; }
    }
    public class RkadetbPost
    {
        public long Idrkadetb { get; set; }
        [Required]
        public long Idrkab { get; set; }
        public string Kdjabar { get; set; }
        public string Uraian { get; set; }
        public string Satuan { get; set; }
        public decimal? Tarif { get; set; }
        public string Ekspresi { get; set; }
        public string Type { get; set; }
        public long? Idrkadetbduk { get; set; }
    }
    public class RkaReturnTransaction
    {
        public long Idrka { get; set; }
        public decimal? Nilai { get; set; }
        public decimal? GrandTotalChild { get; set; }
    }
    public class RkadanarPost
    {
        public long Idrkadanar { get; set; }
        [Required]
        public long Idrkar { get; set; }
        [Required]
        public long Idjdana { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class RkatapdGet
    {
        public long Idtapd { get; set; }
        public long? Idrka { get; set; }
        public long? Idpeg { get; set; }
        public string Nomor { get; set; }
    }
    public class RkatapddetGet
    {
        public long Idtapddet { get; set; }
        public long? Idrkadet { get; set; }
        public long? Idpeg { get; set; }
        public string Nomor { get; set; }
    }
    public class RkatapdPost
    {
        public long Idtapd { get; set; }
        [Required]
        public long? Idrka { get; set; }
        [Required]
        public long? Idpeg { get; set; }
        [Required]
        public string Nomor { get; set; }
        public string Verifikasi { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Keterangan { get; set; }
    }
    public class RkaTransfer
    {
        public long Idunit { get; set; }
        public string Kdtahapawal { get; set; }
        public string Kdtahapakhir { get; set; }
        public string Spname { get; set; }
        public int ismode { get; set; }
        public DateTime? Tgltransfer { get; set; }
    }
    public class RkasahPost
    {
        public long Idrkasah { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long Idpeg { get; set; }
        [Required]
        public string Kdtahap { get; set; }
        public string Uraian { get; set; }
        public DateTime? Tglsah { get; set; }
    }
}
