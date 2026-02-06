using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BLUDBE.Enums
{
    public enum ETahap
    {
        RancanganAwalRenja = 207,
        MusrenbangKelurahan = 201,
        EvaluasiMusrenbangKelurahan = 202,
        MusrenbangKecamatan = 203,
        EvaluasiMusrenbangKecamatan = 204,
        PokirDPRD = 205,
        EvaluasiPokirDPRD = 206,
        ForumOPD = 208,
        RancanganAwalRPJMD = 101,
        MusrenbangRPJMD = 102,
        VerifikasiRancanganRenja = 209,
        MusrenbangKota = 210,
        VerifikasiPenetapanRenja = 211,
        PenetapanRKPD = 212,
        APBDMurni = 321,
        APBDPerubahan = 342,
        RancanganAkhirRPJMD = 103,
        PenetapanRPJMD = 104,
        RancanganKUA = 300,
        ReperdaAPBD = 309,
        DPA = 401,
        DPAPergeseranI = 402,
        DPAPergeseranII = 403,
        DAPPenetapan = 404
    }
    public enum ERekening
    {
        Pendapatan = 1,
        Belanja = 2,
        Pembiayaan = 3
    }
}
