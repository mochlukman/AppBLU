using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Dto
{
    public class PrimengTableParam<T> where T : class
    {
        public int Start { get; set; }
        public int Rows { get; set; }
        public string GlobalFilter { get; set; }
        public string SortField { get; set; }
        public int SortOrder { get; set; }
        public T Parameters { get; set; }
    }
    public class PrimengTableResult<T> where T : class
    {
        public List<T> Data { get; set; }
        public int Totalrecords { get; set; }
        public decimal? TotalNilai { get; set; }
        public PrimengTableResultOptional OptionalResult { get; set; }
        public bool Isvalid { get; set; } // digunakan untuk data yang sudah di sahkan / di validasi, contoh pengesahan RKA
    }
    public class PrimengTableResultOptional
    {
        public decimal? TotalNilai { get; set; }
        
    }
}
