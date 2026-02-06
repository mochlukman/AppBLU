using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class LookupTreeDto
    {
        public string label { get; set; }
        public long data_id { get; set; }
        public long data_id_parent { get; set; }
        public string expandedIcon { get; set; }
        public string collapsedIcon { get; set; }
        public List<LookupTreeDto> children { get; set; }
        public string kegInduk { get; set; }
        public bool this_header { get; set; }
        public string this_level { get; set; }
        public long idrek { get; set; }
    }
    public class LookupTree
    {
        public string label { get; set; }
        public string data_kode { get; set; }
        public string data_nama { get; set; }
        public long data_id { get; set; }
        public long data_id_parent { get; set; }
        public string expandedIcon { get; set; }
        public string collapsedIcon { get; set; }
        public List<LookupTree> children { get; set; }
        public string label_parent{ get; set; }
        public bool this_header { get; set; }
        public string this_level { get; set; }
        public string this_type { get; set; }
        public long idkegFK { get; set; }
    }
}
