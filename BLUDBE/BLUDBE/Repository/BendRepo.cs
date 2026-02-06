using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class BendRepo : Repo<Bend>, IBendRepo
    {
        public BendRepo(DbContext context) : base(context)
        {
        }
        public BludContext _BludContext => _context as BludContext;

        public async Task<List<Bend>> GetByPegawai(long Idunit, string Jnsbend)
        {
            List<Bend> datas = new List<Bend>() { };
            if (!String.IsNullOrEmpty(Jnsbend))
            {
                List<string> jbends = Jnsbend.Split(",").ToList();
                List<Bend> temp = await _BludContext.Bend.Where(w => jbends.Contains(w.Jnsbend.Trim()))
                .Join(_BludContext.Pegawai.Where(w => w.Idunit == Idunit),
                    bendahara => bendahara.Idpeg,
                    pegawai => pegawai.Idpeg,
                    (bendahara, pegawai) => new Bend
                    {
                        Idbend = bendahara.Idbend,
                        Idpemda = bendahara.Idpemda,
                        Jnsbend = bendahara.Jnsbend,
                        Idpeg = bendahara.Idpeg,
                        Idbank = bendahara.Idbank,
                        Nmcabbank = bendahara.Nmcabbank,
                        Rekbend = bendahara.Rekbend,
                        Npwpbend = bendahara.Npwpbend,
                        Jabbend = bendahara.Jabbend,
                        Saldobankup = bendahara.Saldobankup,
                        Saldobankpajak = bendahara.Saldobankpajak,
                        Saldotunaiup = bendahara.Saldotunaiup,
                        Saldotunaipajak = bendahara.Saldotunaipajak,
                        Tglstopbend = bendahara.Tglstopbend,
                        Warganegara = bendahara.Warganegara,
                        Stpendududuk = bendahara.Stpendududuk,
                        Staktif = bendahara.Staktif,
                        Datecreate = bendahara.Datecreate
                    }
                ).ToListAsync().ConfigureAwait(false);
                datas.AddRange(temp);
            } else
            {
                List<Bend> temp = await _BludContext.Bend
                .Join(_BludContext.Pegawai.Where(w => w.Idunit == Idunit),
                    bendahara => bendahara.Idpeg,
                    pegawai => pegawai.Idpeg,
                    (bendahara, pegawai) => new Bend
                    {
                        Idbend = bendahara.Idbend,
                        Idpemda = bendahara.Idpemda,
                        Jnsbend = bendahara.Jnsbend,
                        Idpeg = bendahara.Idpeg,
                        Idbank = bendahara.Idbank,
                        Nmcabbank = bendahara.Nmcabbank,
                        Rekbend = bendahara.Rekbend,
                        Npwpbend = bendahara.Npwpbend,
                        Jabbend = bendahara.Jabbend,
                        Saldobankup = bendahara.Saldobankup,
                        Saldobankpajak = bendahara.Saldobankpajak,
                        Saldotunaiup = bendahara.Saldotunaiup,
                        Saldotunaipajak = bendahara.Saldotunaipajak,
                        Tglstopbend = bendahara.Tglstopbend,
                        Warganegara = bendahara.Warganegara,
                        Stpendududuk = bendahara.Stpendududuk,
                        Staktif = bendahara.Staktif,
                        Datecreate = bendahara.Datecreate
                    }
                ).ToListAsync().ConfigureAwait(false);
                datas.AddRange(temp);
            }
            
            return datas;
        }

        public async Task<List<Bend>> Search(long Idunit, string Jndbend, string Keyword)
        {
            IEnumerable<Bend> data = await (
                from bend in _BludContext.Bend
                join jbend in _BludContext.Jbend on bend.Jnsbend equals jbend.Jnsbend
                join pegawai in _BludContext.Pegawai on bend.Idpeg equals pegawai.Idpeg
                join bank in _BludContext.Daftbank on bend.Idbank equals bank.Idbank
                where pegawai.Idunit == Idunit && (EF.Functions.Like(pegawai.Nip.Trim() ,  "%"+Keyword+"%") || EF.Functions.Like(pegawai.Nama.Trim(), "%" + Keyword + "%"))
                select new Bend
                {
                    Idbend = bend.Idbend,
                    Idpemda = bend.Idpemda,
                    Jnsbend = bend.Jnsbend,
                    Idpeg = bend.Idpeg,
                    Idbank = bend.Idbank,
                    Nmcabbank = bend.Nmcabbank,
                    Rekbend = bend.Rekbend,
                    Npwpbend = bend.Npwpbend,
                    Jabbend = bend.Jabbend,
                    Saldobankup = bend.Saldobankup,
                    Saldobankpajak = bend.Saldobankpajak,
                    Saldotunaiup = bend.Saldotunaiup,
                    Saldotunaipajak = bend.Saldotunaipajak,
                    Tglstopbend = bend.Tglstopbend,
                    Warganegara = bend.Warganegara,
                    Stpendududuk = bend.Stpendududuk,
                    Staktif = bend.Staktif,
                    Datecreate = bend.Datecreate,
                    IdpegNavigation =  pegawai ?? null,
                    JnsbendNavigation = jbend ?? null,
                    IdbankNavigation = bank ?? null
                }
                ).ToListAsync();
            data = data.AsQueryable();
            if (!String.IsNullOrEmpty(Jndbend))
            {
                data = data.Where(w => w.Jnsbend.Trim() == Jndbend);
            }
            return data.ToList();
        }

        public async Task<bool> Update(Bend param)
        {
            Bend data = await _BludContext.Bend.Where(w => w.Idbend == param.Idbend).FirstOrDefaultAsync();
            if(data != null)
            {
                data.Jnsbend = param.Jnsbend;
                data.Idpeg = param.Idpeg;
                data.Idbank = param.Idbank;
                data.Nmcabbank = param.Nmcabbank;
                data.Rekbend = param.Rekbend;
                data.Npwpbend = param.Npwpbend;
                data.Saldobankup = param.Saldobankup;
                data.Saldobankpajak = param.Saldobankpajak;
                data.Saldotunaiup = param.Saldotunaiup;
                data.Saldotunaipajak = param.Saldotunaipajak;
                _BludContext.Bend.Update(data);
                if (await _BludContext.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            return false;
        }
    }
}
