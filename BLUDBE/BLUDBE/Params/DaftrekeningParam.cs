using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class RekeningSearchParam
    {
        public string Keyword { get; set; }
        [Required]
        public string Startwith { get; set; }
        public string Mtglevel { get; set; }
    }
    public class RekeningStartKodeParam
    {
        [Required]
        public string Kode { get; set; }
    }
    public class RekGlobalParam
    {
        public long Idunit { get; set; }
        public long? Idbend { get; set; }
        public int Idxkode { get; set; }
        public string Kdstatus { get; set; }
        public int Kdkhusus { get; set; }
        public long? Idjnsakun { get; set; }
        public long Idkeg { get; set; }
        public string KdperStartwith { get; set; }
        public int Trkr { get; set; }
        public string Kdtahap { get; set; }
        public string Mtglevel { get; set; }
    }
    public class RekJnsakunTypeParam
    {
        public string Idjnsakun { get; set; }
        public string Type { get; set; }
    }
    public class DaftrekeningPost
    {
        public long Idrek { get; set; }
        [Required]
        public string Kdper { get; set; }
        [Required]
        public string Nmper { get; set; }
        [Required]
        public int Mtglevel { get; set; }
        [Required]
        public int Kdkhusus { get; set; }
        [Required]
        public int Jnsrek { get; set; }
        public long? Idjnsakun { get; set; }
        public string Type { get; set; }
        public int? Staktif { get; set; }
    }
    public class RekDPAParam
    {
        public long Idunit { get; set; }
        public long Idkeg { get; set; }
    }

}
