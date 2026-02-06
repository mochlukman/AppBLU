using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class SppdetrView
    {
        public long Idsppdetr { get; set; }
        public long Idrek { get; set; }
        public long Idkeg { get; set; }
        public long Idspp { get; set; }
        public int Idnojetra { get; set; }
        public long? Idjdana { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Jdana IdjdanaNavigation { get; set; }
        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Spp IdsppNavigation { get; set; }
        public decimal? Totspd { get; set; }
        public decimal? Totspp { get; set; }
        public decimal? Sisa { get; set; }
    }
    public class SppdetbView
    {
        public long Idsppdetb { get; set; }
        public long Idrek { get; set; }
        public long Idspp { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public DateTime? Createdate { get; set; }
        public string Createby { get; set; }
        public DateTime? Updatedate { get; set; }
        public string Updateby { get; set; }

        public Jtrnlkas IdnojetraNavigation { get; set; }
        public Daftrekening IdrekNavigation { get; set; }
        public Spp IdsppNavigation { get; set; }
        public decimal? Totspd { get; set; }
        public decimal? Totspp { get; set; }
        public decimal? Sisa { get; set; }
    }
    public class SppdetrViewTreeRoot
    {
        public SppdetrViewTreeData Data { get; set; }
        public List<SppdetrViewTreeRoot> Children { get; set; }
    }
    public class SppdetrViewTreeData
    {
        public string Rowid { get; set; }
        public string Level { get; set; }
        public string kode { get; set; }
        public string uraian { get; set; }
        public long Idsppdetr { get; set; }
        public long Idrek { get; set; }
        public long Idkeg { get; set; }
        public long Idspp { get; set; }
        public int Idnojetra { get; set; }
        public decimal? Nilai { get; set; }
        public decimal? Totspd { get; set; }
        public decimal? Totspp { get; set; }
        public decimal? Sisa { get; set; }
    }
    public partial class BkbankdetView
    {
        public long Idbankdet { get; set; }
        public long Idbkbank { get; set; }
        public int Idnojetra { get; set; }
        //public long Idrek { get; set; }
        public decimal? Nilai { get; set; }

        public Bkbank IdbkbankNavigation { get; set; }
        public Jtrnlkas IdnojetraNavigation { get; set; }
        //public Daftrekening IdrekNavigation { get; set; }
        //public decimal? Sisa { get; set; }
    }
}
