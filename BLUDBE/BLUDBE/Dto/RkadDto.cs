using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;

namespace BLUDBE.Dto
{
    public class RkadView
    {
        public long Idrkad { get; set; }
        public long? Idrkadx { get; set; }
        public long Idunit { get; set; }
        public string Kdtahap { get; set; }
        public long Idrek { get; set; }
        public decimal? Nilai { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Daftrekening IdrekNavigation { get; set; }
        public ICollection<Rkadanad> Rkadanad { get; set; }
        public ICollection<Rkadetd> Rkadetd { get; set; }
        public Rkad Rkadx { get; set; }
    }
    public class RkadetdView
    {
        public long Idrkadetd { get; set; }
        public long Idrkad { get; set; }
        public long Kdnilai { get; set; }
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
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }
        public long? Idrkadetrduk { get; set; }
    }
    public partial class RkatapddView
    {
        public long Idtapdd { get; set; }
        public long? Idrkad { get; set; }
        public long? Idpeg { get; set; }
        public string Nippeg { get; set; }
        public string Namapeg { get; set; }
        public string Nomor { get; set; }
        public string Verifikasi { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Keterangan { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Rkad IdrkadNavigation { get; set; }
    }
    public partial class RkatapddetdView
    {
        public long Idtapddetd { get; set; }
        public long? Idrkadetd { get; set; }
        public long? Idpeg { get; set; }
        public string Nippeg { get; set; }
        public string Namapeg { get; set; }
        public string Nomor { get; set; }
        public string Verifikasi { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Keterangan { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Rkadetd IdrkadetdNavigation { get; set; }
    }
    public partial class RkatapdrView
    {
        public long Idtapdr { get; set; }
        public long? Idrkar { get; set; }
        public long? Idpeg { get; set; }
        public string Nippeg { get; set; }
        public string Namapeg { get; set; }
        public string Nomor { get; set; }
        public string Verifikasi { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Keterangan { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Rkar IdrkarNavigation { get; set; }
    }
    public partial class RkatapddetrView
    {
        public long Idtapddetr { get; set; }
        public long? Idrkadetr { get; set; }
        public long? Idpeg { get; set; }
        public string Nippeg { get; set; }
        public string Namapeg { get; set; }
        public string Nomor { get; set; }
        public string Verifikasi { get; set; }
        public DateTime? Tanggal { get; set; }
        public string Keterangan { get; set; }
        public string Createdby { get; set; }
        public DateTime? Createddate { get; set; }
        public string Updateby { get; set; }
        public DateTime? Updatetime { get; set; }

        public Pegawai IdpegNavigation { get; set; }
        public Rkadetr IdrkadetrNavigation { get; set; }
    }
}
