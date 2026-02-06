using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class BpkGet
    {
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public int Idxkode { get; set; }
        [Required]
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
        public long? Idbend { get; set; }
    }
    public class BpkPost
    {
        public long Idbpk { get; set; }
        [Required]
        public long Idunit { get; set; }
        public long? Idphk3 { get; set; }
        [Required]
        public string Nobpk { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        public long? Idjbayar { get; set; }
        public long Idjtransfer { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public DateTime? Tglbpk { get; set; }
        public string Penerima { get; set; }
        public string Uraibpk { get; set; }
        public long Idsp2d { get; set; }
        public long? Idtagihan { get; set; }
        public long Idkeg { get; set; }
        public bool? Valid { get; set; }
        public string Validby { get; set; }
        public DateTime? Tglvalid { get; set; }
        public string Verifikasi { get; set; }
        public long? Idbend { get; set; }
    }
    public class BpkGetUrutPost
    {
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public int Idxkode { get; set; }
        public long Idkeg { get; set; }
        public long? Idbend { get; set; }
    }
    public class BpkdetrGet
    {
        public long Idbpk { get; set; }
        public long Idkeg { get; set; }
    }
    public class BpkdetrPost
    {
        public long Idbpkdetr { get; set; }
        [Required]
        public long Idbpk { get; set; }
        [Required]
        public long Idkeg { get; set; }
        [Required]
        public List<long> Idrek { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class BpkdetrSinglePost
    {
        public long Idbpkdetr { get; set; }
        [Required]
        public long Idbpk { get; set; }
        [Required]
        public long Idkeg { get; set; }
        [Required]
        public long Idrek { get; set; }
        public long? Idjdana { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class BpkdetrUpdate
    {
        [Required]
        public long Idbpkdetr { get; set; }
        public long Idrek { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public long Idbpk { get; set; }
    }
    public class BpkdetrpPost
    {
        public long Idbpkdetrp { get; set; }
        [Required]
        public long Idbpkdetr { get; set; }
        [Required]
        public long Idpajak { get; set; }
        public decimal? Nilai { get; set; }
    }
    public class BpkForSpjParam
    {
        [Required]
        public long Idspj { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        [Required]
        public long? Idbend { get; set; }
    }
    public class BpkpajakGet
    {
        public long Idbpk { get; set; }
        public string Kdstatus { get; set; }
        public long Idbpkpajakstr { get; set; } // digunakan untuk get data != BPKPAJAKSTRDET / untuk input kee BPKPAJAKSTRDET
        public long Idunit { get; set; } // digunakan ketika get idunit di masukan sebagai parameter
        public long? Idbend { get; set; }
    }
    public class BpkPajakPost
    {
        public long Idbpkpajak { get; set; }
        [Required]
        public long Idbpk { get; set; }
        public string Uraian { get; set; }
        public string Nomor { get; set; }
        public DateTime? Tanggal { get; set; }
        [Required]
        public string Kdstatus { get; set; }
    }
    public class BpkpajakdetGet
    {
        public long Idbpkpajak { get; set; }
    }
    public class BpkpajakdetPost
    {
        public long Idbpkpajakdet { get; set; }
        [Required]
        public long Idbpkpajak { get; set; }
        [Required]
        public long Idpajak { get; set; }
        public decimal? Nilai { get; set; }
        public string Idbilling { get; set; }
        public DateTime? Tglbilling { get; set; }
        public string Ntpn { get; set; }
        public string Ntb { get; set; }
    }
    public class BpkpajakdetPostList
    {
        [Required]
        public long Idbpkpajak { get; set; }
        [Required]
        public List<long> Idpajak { get; set; }
    }
    public class BpkpajakdetUpdate
    {
        [Required]
        public long Idbpkpajakdet { get; set; }
        [Required]
        public decimal? Nilai { get; set; }
    }
    public class BpkpajakstrGet
    {
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public string Kdstatus { get; set; }
    }
    public class BpkPajakstrPost
    {
        public long Idbpkpajakstr { get; set; }
        [Required]
        public long Idunit { get; set; }
        [Required]
        public long? Idbend { get; set; }
        public string Uraian { get; set; }
        public string Nomor { get; set; }
        public DateTime? Tanggal { get; set; }
        [Required]
        public string Kdstatus { get; set; }
        public bool? Valid { get; set; }
        public DateTime? Tglvalid { get; set; }
    }
    public class BpkpajakstrdetGet
    {
        public long Idbpkpajakstr { get; set; }
    }
    public class BpkpajakstrdetPost
    {
        [Required]
        public long Idbpkpajakstr { get; set; }
        [Required]
        public List<long> Idbpkpajak { get; set; }
    }
    public class BpkpajakstrdetUpdate
    {
        [Required]
        public long Idbpkpajakstrdet { get; set; }
        [Required]
        public decimal? Nilai { get; set; }
    }
}
