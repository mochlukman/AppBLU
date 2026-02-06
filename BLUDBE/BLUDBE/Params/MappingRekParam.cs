using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Params
{
    public class MapLoPost
    {
        [Required]
        public string Idjnsakun { get; set; }
        [Required]
        public long Idreklo { get; set; }
        public List<long> Idreklra { get; set; }
    }
    public class MapPiutangPost
    {
        [Required]
        public string Idjnsakun { get; set; }
        [Required]
        public long Idreklo { get; set; }
        public List<long> Idreknrc { get; set; }
    }
    public class MapAsetPost
    {
        [Required]
        public long Idrekaset { get; set; }
        public List<long> Idrekhutang { get; set; }
    }
    public class MapBelanjaModalPost
    {
        [Required]
        public long Idrek { get; set; }
        [Required]
        public string Kdpers { get; set; }
        public List<long> Idreknrc { get; set; }
    }
    public class MappingLakPost
    {
        [Required]
        public string Idjnslak { get; set; }
        public List<long> Idreklra { get; set; }
        [Required]
        public long Idreklak { get; set; }
    }
    public class MapKDPPost
    {
        [Required]
        public long Idrekkdp { get; set; }
        public List<long> Idrekbm { get; set; }
    }
}
