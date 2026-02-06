using System;
using System.Collections.Generic;

namespace BLUDBE.Models
{
    public partial class Jtrnlkas
    {
        public Jtrnlkas()
        {
            Bkbankdet = new HashSet<Bkbankdet>();
            Bpkdetr = new HashSet<Bpkdetr>();
            Sp2ddetb = new HashSet<Sp2ddetb>();
            Sp2ddetd = new HashSet<Sp2ddetd>();
            Sp2ddetr = new HashSet<Sp2ddetr>();
            Spjapbddet = new HashSet<Spjapbddet>();
            Sppdetb = new HashSet<Sppdetb>();
            Sppdetd = new HashSet<Sppdetd>();
            Sppdetr = new HashSet<Sppdetr>();
            Stsdetb = new HashSet<Stsdetb>();
            Stsdetd = new HashSet<Stsdetd>();
            Stsdett = new HashSet<Stsdett>();
            Tbpdetb = new HashSet<Tbpdetb>();
            Tbpdetd = new HashSet<Tbpdetd>();
            Tbpdetr = new HashSet<Tbpdetr>();
            Tbpdett = new HashSet<Tbpdett>();
            Tbpldet = new HashSet<Tbpldet>();
            Tbpldetkeg = new HashSet<Tbpldetkeg>();
        }

        public int Idnojetra { get; set; }
        public string Nmjetra { get; set; }
        public string Kdpers { get; set; }

        public ICollection<Bkbankdet> Bkbankdet { get; set; }
        public ICollection<Bpkdetr> Bpkdetr { get; set; }
        public ICollection<Sp2ddetb> Sp2ddetb { get; set; }
        public ICollection<Sp2ddetd> Sp2ddetd { get; set; }
        public ICollection<Sp2ddetr> Sp2ddetr { get; set; }
        public ICollection<Spjapbddet> Spjapbddet { get; set; }
        public ICollection<Sppdetb> Sppdetb { get; set; }
        public ICollection<Sppdetd> Sppdetd { get; set; }
        public ICollection<Sppdetr> Sppdetr { get; set; }
        public ICollection<Stsdetb> Stsdetb { get; set; }
        public ICollection<Stsdetd> Stsdetd { get; set; }
        public ICollection<Stsdett> Stsdett { get; set; }
        public ICollection<Tbpdetb> Tbpdetb { get; set; }
        public ICollection<Tbpdetd> Tbpdetd { get; set; }
        public ICollection<Tbpdetr> Tbpdetr { get; set; }
        public ICollection<Tbpdett> Tbpdett { get; set; }
        public ICollection<Tbpldet> Tbpldet { get; set; }
        public ICollection<Tbpldetkeg> Tbpldetkeg { get; set; }
    }
}
