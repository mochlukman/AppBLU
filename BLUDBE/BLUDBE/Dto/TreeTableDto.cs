using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class TreeTableRekeningRoot
    {
        public TreeTableRekeningData Data { get; set; }
        public List<TreeTableRekeningRoot> Children { get; set; }
    }
    public class TreeTableRekeningData
    {
        public string row_id { get; set; }
        public string kode { get; set; }
        public string uraian { get; set; }
        public string this_level { get; set; }
        public decimal? nilai { get; set; }
        public long idbpkdetr { get; set; }
        public long idbpk { get; set; }
    }
}
