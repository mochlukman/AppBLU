using AutoMapper;
using RKPD.API.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Dto
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Menu, MenuDto>();
            CreateMap<Webotor, WebOtorViewDto>();
            CreateMap<Daftunit, DaftunitView>();

            CreateMap<RkadUpdate, Rkad>();
            CreateMap<RkarUpdate, Rkar>();
            CreateMap<RkabUpdate, Rkab>();
            CreateMap<RkadetdPost, Rkadetd>();
            CreateMap<RkadetrPost, Rkadetr>();
            CreateMap<RkadetbPost, Rkadetb>();
            CreateMap<RkadanarPost, Rkadanar>();

            CreateMap<Rkab, RkabView>();
            CreateMap<Rkar, RkarView>();
            CreateMap<Rkadetb, RkadetbView>();
            CreateMap<Rkadetr, RkadetrView>();
            CreateMap<Rkadanar, RkadanarView>();
            CreateMap<Dpad, DpadView>();
            CreateMap<Dpadetd, DpadetdView>();
            CreateMap<Dpablnd, DpablndView>();
            CreateMap<Dpab, DpabView>();
            CreateMap<Dpadetb, DpadetbView>();
            CreateMap<Dpablnb, DpablnbView>();
            CreateMap<Dpar, DparView>();
            CreateMap<Dpadetr, DpadetrView>();
            CreateMap<Dpablnr, DpablnrView>();
            CreateMap<DpaPost, Dpa>();
            CreateMap<DpaUpdateNilai, Dpa>();
            CreateMap<DpadetdPost, Dpadetd>();
            CreateMap<DpadetbPost, Dpadetb>();
            CreateMap<DpadetrPost, Dpadetr>();
            CreateMap<Spd, SpdView>();
            CreateMap<SpdPost, Spd>();
            CreateMap<Spddetb, SpddetbView>();
            CreateMap<Spddetr, SpddetrView>();
            CreateMap<BulanPost, Bulan>();
            CreateMap<DaftbankPost, Daftbank>();
            CreateMap<JusahaPost, Jusaha>();
            CreateMap<Daftphk3Post, Daftphk3>();
            CreateMap<JbankPost, Jbank>();
            CreateMap<KontrakPost, Kontrak>();
            CreateMap<StattrsPost, Stattrs>();
            CreateMap<TagihanPost, Tagihan>();
            CreateMap<Tagihan, TagihanView>();
            CreateMap<TagihandetPost, Tagihandet>();
            CreateMap<Tagihandet, TagihandetView>();
            CreateMap<Kontrakdetr, KontrakdetrView>();
            CreateMap<KontrakdetrPost, Kontrakdetr>();
            CreateMap<DparPost, Dpar>();
            CreateMap<JdanaPost, Jdana>();
            CreateMap<DpadanarPost, Dpadanar>();
            CreateMap<DpadUpdate, Dpad>();
            CreateMap<DpabUpdate, Dpab>();
            CreateMap<DparUpdate, Dpar>();
            CreateMap<DaftdokPost, Daftdok>();
            CreateMap<Jabttd, JabttdView>();
            CreateMap<JabttdPost, Jabttd>();
            CreateMap<JbendPost, Jbend>();
            CreateMap<BendPost, Bend>();
            CreateMap<TahapPost, Tahap>();
            CreateMap<PaguskpdPost, Paguskpd>();
            CreateMap<Paguskpd, PaguskpdView>();
            CreateMap<Bkbkas, BkbkasView>();
            CreateMap<BkbkasPost, Bkbkas>();
            CreateMap<WebuserPost, Webuser>();
            CreateMap<Webuser, WebuserView>();
            CreateMap<WebgroupPost, Webgroup>();
            CreateMap<StrurekPost, Strurek>();
            CreateMap<SppPost, Spp>();
            CreateMap<ZkodePost, Zkode>();
            CreateMap<JtrnlkasPost, Jtrnlkas>();
            CreateMap<SppdetbPost, Sppdetb>();
            CreateMap<SppdetbUpdate, Sppdetb>();
            CreateMap<JkegPost, Jkeg>();
            CreateMap<SppdetrPost, Sppdetr>();
            CreateMap<SppdetrUpdate, Sppdetr>();
            CreateMap<Sppdetr, SppdetrView>();
            CreateMap<Sppdetb, SppdetbView>();
            CreateMap<JtermorlunPost, Jtermorlun>();
            CreateMap<AdendumPost, Adendum>();
            CreateMap<SppdetrPostMultiKeg, Sppdetr>();
            CreateMap<SppdetrPostSingle, Sppdetr>();
            CreateMap<SpmPost, Spm>();
            CreateMap<JnspajakPost, Jnspajak>();
            CreateMap<PajakPost, Pajak>();
            CreateMap<SppdetrpPost, Sppdetrp>();
            CreateMap<Sp2dPost, Sp2d>();
            CreateMap<Bpk, BpkView>();
            CreateMap<JbayarPost, Jbayar>();
            CreateMap<BpkPost, Bpk>();
            CreateMap<BpkdetrPost, Bpkdetr>();
            CreateMap<BpkdetrSinglePost, Bpkdetr>();
            CreateMap<BpkdetrUpdate, Bpkdetr>();
            CreateMap<BpkdetrpPost, Bpkdetrp>();
            CreateMap<JtransferPost, Jtransfer>();
            CreateMap<BkbankPost, Bkbank>();
            CreateMap<BkbankdetPost, Bkbankdet>();
            CreateMap<TbpPost, Tbp>();
            CreateMap<TbplPost, Tbpl>();
            CreateMap<TbpdettPost, Tbpdett>();
            CreateMap<TbpdettUpdate, Tbpdett>();
            CreateMap<TbpdettkegPost, Tbpdettkeg>();

            CreateMap<BkuPost, Bkusp2d>()
                 .ForMember(f => f.Idsp2d, opt => opt.MapFrom(m => m.Idref))
                 .ForMember(f => f.Idbkusp2d, opt => opt.MapFrom(m => m.Idbku))
                 .ForMember(f => f.Nobkuskpd, opt => opt.MapFrom(m => m.Nobku))
                 .ForMember(f => f.Tglbkuskpd, opt => opt.MapFrom(m => m.Tglbku));
            CreateMap<BkuPost, Bkutbp>()
                 .ForMember(f => f.Idtbp, opt => opt.MapFrom(m => m.Idref))
                 .ForMember(f => f.Idbkutbp, opt => opt.MapFrom(m => m.Idbku))
                 .ForMember(f => f.Nobkuskpd, opt => opt.MapFrom(m => m.Nobku))
                 .ForMember(f => f.Tglbkuskpd, opt => opt.MapFrom(m => m.Tglbku));
            CreateMap<BkuPost, Bkubpk>()
                 .ForMember(f => f.Idbpk, opt => opt.MapFrom(m => m.Idref))
                 .ForMember(f => f.Idbkubpk, opt => opt.MapFrom(m => m.Idbku))
                 .ForMember(f => f.Nobkuskpd, opt => opt.MapFrom(m => m.Nobku))
                 .ForMember(f => f.Tglbkuskpd, opt => opt.MapFrom(m => m.Tglbku));
            CreateMap<BkuPost, Bkupajak>()
                 .ForMember(f => f.Idbkupajak, opt => opt.MapFrom(m => m.Idbku))
                 .ForMember(f => f.Nobkuskpd, opt => opt.MapFrom(m => m.Nobku))
                 .ForMember(f => f.Tglbkuskpd, opt => opt.MapFrom(m => m.Tglbku));
            CreateMap<BkuPost, Bkupanjar>()
                 .ForMember(f => f.Idpanjar, opt => opt.MapFrom(m => m.Idref))
                 .ForMember(f => f.Idbkupanjar, opt => opt.MapFrom(m => m.Idbku))
                 .ForMember(f => f.Nobkuskpd, opt => opt.MapFrom(m => m.Nobku))
                 .ForMember(f => f.Tglbkuskpd, opt => opt.MapFrom(m => m.Tglbku));
            CreateMap<BkuPost, Bkubank>()
                 .ForMember(f => f.Idbkbank, opt => opt.MapFrom(m => m.Idref))
                 .ForMember(f => f.Idbkubank, opt => opt.MapFrom(m => m.Idbku))
                 .ForMember(f => f.Nobkuskpd, opt => opt.MapFrom(m => m.Nobku))
                 .ForMember(f => f.Tglbkuskpd, opt => opt.MapFrom(m => m.Tglbku));
            CreateMap<BkuPost, Bkusts>()
                 .ForMember(f => f.Idsts, opt => opt.MapFrom(m => m.Idref))
                 .ForMember(f => f.Idbkusts, opt => opt.MapFrom(m => m.Idbku))
                 .ForMember(f => f.Nobkuskpd, opt => opt.MapFrom(m => m.Nobku))
                 .ForMember(f => f.Tglbkuskpd, opt => opt.MapFrom(m => m.Tglbku));
            CreateMap<RkatapdPost, Rkatapdd>()
                .ForMember(f => f.Idtapdd, opt => opt.MapFrom(m => m.Idtapd))
                .ForMember(f => f.Idrkad, opt => opt.MapFrom(m => m.Idrka));
            CreateMap<BkuBudPost, Bkud>()
                .ForMember(f => f.Idsts, opt => opt.MapFrom(m => m.Idref));
            CreateMap<BkuBudPost, Bkuk>()
                .ForMember(f => f.Idsp2d, opt => opt.MapFrom(m => m.Idref));
            CreateMap<PanjarPost, Panjar>();
            CreateMap<Panjardet, PanjardetView>();
            CreateMap<PanjardetPost, Panjardet>();
            CreateMap<BkpajakPost, Bkpajak>();
            CreateMap<BkpajakdetstrPost, Bkpajakdetstr>();
            CreateMap<SkpPost, Skp>();
            CreateMap<Skp, SkpView>();
            CreateMap<SkpdetUpdate, Skpdet>();
            CreateMap<TbpdetdUpdate, Tbpdetd>();
            CreateMap<StsPost, Sts>();
            CreateMap<StsdetdPost, Stsdetd>();
            CreateMap<StsdetdUpdate, Stsdetd>();
            CreateMap<TbpstsPost, Tbpsts>();
            CreateMap<StsdetbPost, Stsdetb>();
            CreateMap<StsdetbUpdate, Stsdetb>();
            CreateMap<StsdettPost, Stsdett>();
            CreateMap<StsdettUpdate, Stsdett>();
            CreateMap<StsdetrPost, Stsdetr>();

            CreateMap<JbmPost, Jbm>();
            CreateMap<BktmemPost, Bktmem>();

            CreateMap<PrognosisPost, Prognosisb>();
            CreateMap<PrognosisPost, Prognosisd>();
            CreateMap<PrognosisrPost, Prognosisr>();

            CreateMap<SaldoawalnrcPost, Saldoawalnrc>();
            CreateMap<SaldoawallraPost, Saldoawallra>();
            CreateMap<SaldoawallraPost, Saldoawallo>();

            CreateMap<SpjPost, Spj>();
            CreateMap<LpjPost, Lpj>();

            CreateMap<SpjtrPost, Spjtr>();

            CreateMap<SpmdetdPost, Spmdetd>();
            CreateMap<SpmdetdUpdate, Spmdetd>();

            CreateMap<SpmdetbPost, Spmdetb>();
            CreateMap<SpmdetbUpdate, Spmdetb>();

            CreateMap<DpPost, Dp>();
            CreateMap<Dpdet, DpdetView>();

            CreateMap<PgrmunitPost, Pgrmunit>();
            CreateMap<KegunitPost, Kegunit>();

            CreateMap<KinkegPost, Kinkeg>();

            CreateMap<KegsbdanaPost, Kegsbdana>();

            CreateMap<RkatapdPost, Rkatapdd>()
                .ForMember(f => f.Idtapdd, opt => opt.MapFrom(m => m.Idtapd))
                .ForMember(f => f.Idrkad, opt => opt.MapFrom(m => m.Idrka));
            CreateMap<RkatapdPost, Rkatapdr>()
                .ForMember(f => f.Idtapdr, opt => opt.MapFrom(m => m.Idtapd))
                .ForMember(f => f.Idrkar, opt => opt.MapFrom(m => m.Idrka));
            CreateMap<RkatapdPost, Rkatapdb>()
                .ForMember(f => f.Idtapdb, opt => opt.MapFrom(m => m.Idtapd))
                .ForMember(f => f.Idrkab, opt => opt.MapFrom(m => m.Idrka));
            CreateMap<RkatapdPost, Rkatapddetd>()
                .ForMember(f => f.Idtapddetd, opt => opt.MapFrom(m => m.Idtapd))
                .ForMember(f => f.Idrkadetd, opt => opt.MapFrom(m => m.Idrka));
            CreateMap<RkatapdPost, Rkatapddetr>()
                .ForMember(f => f.Idtapddetr, opt => opt.MapFrom(m => m.Idtapd))
                .ForMember(f => f.Idrkadetr, opt => opt.MapFrom(m => m.Idrka));
            CreateMap<RkatapdPost, Rkatapddetb>()
               .ForMember(f => f.Idtapddetb, opt => opt.MapFrom(m => m.Idtapd))
               .ForMember(f => f.Idrkadetb, opt => opt.MapFrom(m => m.Idrka));

            CreateMap<RkasahPost, Rkasah>();
            CreateMap<WebsetPost, Webset>();

            CreateMap<CheckdokPost, Checkdok>();

            CreateMap<PegawaiPost, Pegawai>();
            CreateMap<GolonganPost, Golongan>();

            CreateMap<DafturusPost, Dafturus>();
            CreateMap<DaftunitPost, Daftunit>();
            CreateMap<MpgrmPost, Mpgrm>();
            CreateMap<MkegiatanPost, Mkegiatan>();
            CreateMap<DaftrekeningPost, Daftrekening>();

            CreateMap<BpkPajakPost, Bpkpajak>();
            CreateMap<BpkpajakdetPost, Bpkpajakdet>();
            CreateMap<BpkPajakstrPost, Bpkpajakstr>();
            CreateMap<BpkpajakstrdetUpdate, Bpkpajakstrdet>();
            CreateMap<Sp2dNtpnPost, Sp2dntpn>();
            CreateMap<DaftbarangPost, Daftbarang>();
            CreateMap<SshPost, Ssh>();
            CreateMap<AtasbendPost, Atasbend>();
            CreateMap<AtasbendUpdate, Atasbend>();
            CreateMap<PotonganPost, Potongan>();
            CreateMap<PotonganUpdate, Potongan>();
            CreateMap<SppdetrpotPost, Sppdetrpot>();
            CreateMap<SppdetrpotUpdate, Sppdetrpot>();
            CreateMap<PpkPost, Ppk>();
            CreateMap<Spptag, SpptagView>();
            CreateMap<SpjapbdPost, Spjapbd>();
            CreateMap<SpjapbddetPost, Spjapbddet>();
            CreateMap<DaftreklakPost, Daftreklak>();
            CreateMap<Sp3bPost, Sp3b>();
            CreateMap<Sp3bdetPost, Sp3bdet>();
            CreateMap<Sp2bPost, Sp2b>();
            CreateMap<Sp2bdetPost, Sp2bdet>();
            CreateMap<SaldoawallakPost, Saldoawallak>();
        }
    }
}
