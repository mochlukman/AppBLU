using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BLUDBE.Interface;
using BLUDBE.Models;

namespace BLUDBE.Repository
{
    public class Uow : IUow
    {
        private readonly BludContext _BludContext;
        private readonly IMapper _mapper;
        public IAuthRepo AuthRepo { get; set; }
        public IWebgroupRepo WebgroupRepo { get; set; }
        public ITahunRepo TahunRepo { get; set; }
        public IWebuserRepo WebuserRepo { get; set; }
        public IWebotorRepo WebotorRepo { get; set; }
        public IWebroleRepo WebroleRepo { get; set; }
        public IMenuRepo MenuRepo { get; set; }
        public IDafturusRepo DafturusRepo { get; set; }
        public IDaftunitRepo DaftunitRepo { get; set; }
        public IRkabRepo RkabRepo { get; set; }
        public IRkadetbRepo RkadetbRepo { get; set; }
        public IRkadanabRepo RkadanabRepo { get; set; }
        public IRkadRepo RkadRepo { get; set; }
        public IRkadetdRepo RkadetdRepo { get; set; }
        public IRkadanadRepo RkadanadRepo { get; set; }
        public IRkarRepo RkarRepo { get; set; }
        public IRkadetrRepo RkadetrRepo { get; set; }
        public IRkadanarRepo RkadanarRepo { get; set; }
        public IDpaRepo DpaRepo { get; set; }
        public IDpabRepo DpabRepo { get; set; }
        public IDpablnbRepo DpablnbRepo { get; set; }
        public IDpadetbRepo DpadetbRepo { get; set; }
        public IDpadanabRepo DpadanabRepo { get; set; }
        public IDpadRepo DpadRepo { get; set; }
        public IDpablndRepo DpablndRepo { get; set; }
        public IDpadetdRepo DpadetdRepo { get; set; }
        public IDpadanadRepo DpadanadRepo { get; set; }
        public IDparRepo DparRepo { get; set; }
        public IDpablnrRepo DpablnrRepo { get; set; }
        public IDpadetrRepo DpadetrRepo { get; set; }
        public IDpadanarRepo DpadanarRepo { get; set; }
        public IDaftrekeningRepo DaftrekeningRepo { get; set; }
        public IMkegiatanRepo MkegiatanRepo { get; set; }
        public IJdanaRepo JdanaRepo { get; set; }
        public IStdhargaRepo StdhargaRepo { get; set; }
        public IKegunitRepo KegunitRepo { get; set; }
        public IMpgrmRepo MpgrmRepo { get; set; }
        public IUrusanunitRepo UrusanunitRepo { get; set; }
        public IPgrmunitRepo PgrmunitRepo { get; set; }
        public IBulanRepo BulanRepo { get; set; }
        public IJsatuanRepo JsatuanRepo { get; set; }
        public ISpdRepo SpdRepo { get; set; }
        public ISpddetbRepo SpddetbRepo { get; set; }
        public ISpddetrRepo SpddetrRepo { get; set; }
        public IDaftbankRepo DaftbankRepo { get; set; }
        public IJusahaRepo JusahaRepo { get; set; }
        public IDaftphk3Repo Daftphk3Repo { get; set; }
        public IJbankRepo JbankRepo { get; set; }
        public IKontrakRepo KontrakRepo { get; set; }
        public IKontrakdetrRepo KontrakdetrRepo { get; set; }
        public IStattrsRepo StattrsRepo { get; set; }
        public ITagihanRepo TagihanRepo { get; set; }
        public ITagihandetRepo TagihandetRepo { get; set; }
        public IJtermorlunRepo JtermorlunRepo { get; set; }
        public ISifatkegRepo SifatkegRepo { get; set; }
        public IPegawaiRepo PegawaiRepo { get; set; }
        public IDpaprogramRepo DpaprogramRepo { get; set; }
        public IDpakegiatanRepo DpakegiatanRepo { get; set; }
        public IJabttdRepo JabttdRepo { get; set; }
        public IDaftdokRepo DaftdokRepo { get; set; }
        public IPemdaRepo PemdaRepo { get; set; }
        public IGolonganRepo GolonganRepo { get; set; }
        public IJbendRepo JbendRepo { get; set; }
        public IBendRepo BendRepo { get; set; }
        public ITahapRepo TahapRepo { get; set; }
        public IPaguskpdRepo PaguskpdRepo { get; set; }
        public IBkbkasRepo BkbkasRepo { get; set; }
        public IStrurekRepo StrurekRepo { get; set; }
        public ISppRepo SppRepo { get; set; }
        public IZkodeRepo ZkodeRepo { get; set; }
        public ISppdetbRepo SppdetbRepo { get; set; }
        public IJtrnlkasRepo JtrnlkasRepo { get; set; }
        public IJkegRepo JkegRepo { get; set; }
        public ISppdetrRepo SppdetrRepo { get; set; }
        public ISpptagRepo SpptagRepo { get; set; }
        public IAdendumRepo AdendumRepo { get; set; }
        public ISpjRepo SpjRepo { get; set; }
        public ISpjsppRepo SpjsppRepo { get; set; }
        public IBpkspjRepo BpkspjRepo { get; set; }
        public IBpkdetrRepo BpkdetrRepo { get; set; }
        public ISpmRepo SpmRepo { get; set; }
        public ISpmdetdRepo SpmdetdRepo { get; set; }
        public ISpmdetbRepo SpmdetbRepo { get; set; }
        public IJnspajakRepo JnspajakRepo { get; set; }
        public IPajakRepo PajakRepo { get; set; }
        public ISppdetrpRepo SppdetrpRepo { get; set; }
        public ISp2dRepo Sp2dRepo { get; set; }
        public IBpkRepo BpkRepo { get; set; }
        public IJbayarRepo JbayarRepo { get; set; }
        public IJtransferRepo JtransferRepo { get; set; }
        public ISp2dbpkRepo Sp2dbpkRepo { get; set; }
        public IBkbankRepo BkbankRepo { get; set; }
        public IBkbankdetRepo BkbankdetRepo { get; set; }
        public ITbpdetbRepo TbpdetbRepo { get; set; }
        public ITbpdetdRepo TbpdetdRepo { get; set; }
        public ITbpdetrRepo TbpdetrRepo { get; set; }
        public ITbpdettRepo TbpdettRepo { get; set; }
        public ITbpdettkegRepo TbpdettkegRepo { get; set; }
        public ITbpldetkegRepo TbpldetkegRepo { get; set; }
        public ITbpldetRepo TbpldetRepo { get; set; }
        public ITbplRepo TbplRepo { get; set; }
        public ITbpRepo TbpRepo { get; set; }
        public IBkubankRepo BkubankRepo { get; set; }
        public IBkubpkRepo BkubpkRepo { get; set; }
        public IBkudRepo BkudRepo { get; set; }
        public IBkukRepo BkukRepo { get; set; }
        public IBkupajakRepo BkupajakRepo { get; set; }
        public IBkusp2dRepo Bkusp2DRepo { get; set; }
        public IBkustsRepo BkustsRepo { get; set; }
        public IBkutbpRepo BkutbpRepo { get; set; }
        public IBpkpajakRepo BpkpajakRepo { get; set; }
        public IPanjarRepo PanjarRepo { get; set; }
        public IPanjardetRepo PanjardetRepo { get; set; }
        public IBkupanjarRepo BkupanjarRepo { get; set; }
        public IBkuRepo BkuRepo { get; set; }
        public IBkpajakRepo BkpajakRepo { get; set; }
        public IBkpajakdetstrRepo BkpajakdetstrRepo { get; set; }
        public ISkpRepo SkpRepo { get; set; }
        public ISkpdetRepo SkpdetRepo { get; set; }
        public IStsRepo StsRepo { get; set; }
        public IStsdetbRepo StsdetbRepo { get; set; }
        public IStsdetdRepo StsdetdRepo { get; set; }
        public IStsdetrRepo StsdetrRepo { get; set; }
        public IStsdettRepo StsdettRepo { get; set; }
        public ITbpstsRepo TbpstsRepo { get; set; }
        public ISkpstsRepo SkpstsRepo { get; set; }
        public IJbmRepo JbmRepo { get; set; }
        public IBktmemRepo BktmemRepo { get; set; }
        public IBktmemdetbRepo BktmemdetbRepo { get; set; }
        public IBktmemdetdRepo BktmemdetdRepo { get; set; }
        public IBktmemdetrRepo BktmemdetrRepo { get; set; }
        public IBktmemdetnRepo BktmemdetnRepo { get; set; }
        public IJnsakunRepo JnsakunRepo { get; set; }
        public IJurnalRepo JurnalRepo { get; set; }
        public IPrognosisbRepo PrognosisbRepo { get; set; }
        public IPrognosisdRepo PrognosisdRepo { get; set; }
        public IPrognosisrRepo PrognosisrRepo { get; set; }
        public ISaldoawallraRepo SaldoawallraRepo { get; set; }
        public ISaldoawalnrcRepo SaldoawalnrcRepo { get; set; }
        public ISaldoawalloRepo SaldoawalloRepo { get; set; }
        public IJnslakRepo JnslakRepo { get; set; }
        public IDaftreklakRepo DaftreklakRepo { get; set; }
        public ILpjRepo LpjRepo { get; set; }
        public ISpjlpjRepo SpjlpjRepo { get; set; }
        public ISpjtrRepo SpjtrRepo { get; set; }
        public IBkutbpspjtrRepo BkutbpspjtrRepo { get; set; }
        public IBkustsspjtrRepo BkustsspjtrRepo { get; set; }
        public IJbkasRepo JbkasRepo { get; set; }
        public IDpRepo DpRepo { get; set; }
        public IDpdetRepo DpdetRepo { get; set; }
        public IJkinkegRepo JkinkegRepo { get; set; }
        public IKinkegRepo KinkegRepo { get; set; }
        public IKegsbdanaRepo KegsbdanaRepo { get; set; }
        public IRkatapddRepo RkatapddRepo { get; set; }
        public IRkatapdbRepo RkatapdbRepo { get; set; }
        public IRkatapdrRepo RkatapdrRepo { get; set; }
        public IRkatapddetbRepo RkatapddetbRepo { get; set; }
        public IRkatapddetdRepo RkatapddetdRepo { get; set; }
        public IRkatapddetrRepo RkatapddetrRepo { get; set; }
        public IRkasahRepo RkasahRepo { get; set; }
        public IWebsetRepo WebsetRepo { get; set; }
        public ICheckdokRepo CheckdokRepo { get; set; }
        public ISppcheckdokRepo SppcheckdokRepo { get; set; }
        public IStruunitRepo StruunitRepo { get; set; }
        public IJrekRepo JrekRepo { get; set; }
        public IBpkpajakdetRepo BpkpajakdetRepo { get; set; }
        public IBpkpajakstrRepo BpkpajakstrRepo { get; set; }
        public IBpkpajakstrdetRepo BpkpajakstrdetRepo { get; set; }
        public ISp2dcheckdokRepo Sp2DcheckdokRepo { get; set; }
        public ISp2dNtpnRepo Sp2dNtpnRepo { get; set; }
        public ISkptbpRepo SkptbpRepo { get; set; }
        public IDaftbarangRepo DaftbarangRepo { get; set; }
        public ISshRepo SshRepo { get; set; }
        public ISshrekRepo SshrekRepo { get; set; }
        public ISetdlraloRepo SetdlraloRepo { get; set; }
        public ISetrlraloRepo SetrlraloRepo { get; set; }
        public ISetupdloRepo SetupdloRepo { get; set; }
        public ISetuprloRepo SetuprloRepo { get; set; }
        public ISetkorolariRepo SetkorolariRepo { get; set; }
        public ISetnrcmapRepo SetnrcmapRepo { get; set; }
        public ISetblakRepo SetblakRepo { get; set; }
        public ISetrlakRepo SetrlakRepo { get; set; }
        public ISetdlakRepo SetdlakRepo { get; set; }
        public ISetkdpRepo SetkdpRepo { get; set; }
        public IAtasbendRepo AtasbendRepo { get; set; }
        public IPotonganRepo PotonganRepo { get; set; }
        public ISppdetrpotRepo SppdetrpotRepo { get; set; }
        public IPpkRepo PpkRepo { get; set; }
        public ISetdapbdrbaRepo SetdapbdrbaRepo { get; set; }
        public ISetrapbdrbaRepo SetrapbdrbaRepo { get; set; }
        public ISetpendbljRepo SetpendbljRepo { get; set; }
        public ISetmappfkRepo SetmappfkRepo { get; set; }
        public ISpjapbdRepo SpjapbdRepo { get; set; }
        public ISpjapbddetRepo SpjapbddetRepo { get; set; }
        public ISp3bRepo Sp3BRepo { get; set; }
        public ISp2bRepo Sp2BRepo { get; set; }
        public ISp3bdetRepo Sp3BdetRepo { get; set; }
        public ISp2bdetRepo Sp2BdetRepo { get; set; }
        public ISaldoawallakRepo SaldoawallakRepo { get; set; }
        public Uow(IMapper mapper, BludContext BludContext)
        {
            _mapper = mapper;
            _BludContext = BludContext;
            AuthRepo = new AuthRepo(_BludContext);
            WebgroupRepo = new WebgroupRexpo(_BludContext);
            TahunRepo = new TahunRepo(_BludContext);
            WebuserRepo = new WebuserRepo(_BludContext);
            WebotorRepo = new WebotorRepo(_BludContext);
            WebroleRepo = new WebroleRepo(_BludContext);
            MenuRepo = new MenuRepo(_BludContext, _mapper);
            DafturusRepo = new DafturusRepo(_BludContext);
            DaftunitRepo = new DaftunitRepo(_BludContext);
            RkabRepo = new RkabRepo(_BludContext);
            RkadanabRepo = new RkadanabRepo(_BludContext);
            RkadetbRepo = new RkadetbRepo(_BludContext);
            RkadRepo = new RkadRepo(_BludContext);
            RkadanadRepo = new RkadanadRepo(_BludContext);
            RkadetdRepo = new RkadetdRepo(_BludContext);
            RkarRepo = new RkarRepo(_BludContext);
            RkadetrRepo = new RkadetrRepo(_BludContext);
            RkadanarRepo = new RkadanarRepo(_BludContext);
            DpaRepo = new DpaRepo(_BludContext);
            DpabRepo = new DpabRepo(_BludContext);
            DpablnbRepo = new DpablnbRepo(_BludContext);
            DpadetbRepo = new DpadetbRepo(_BludContext);
            DpadanabRepo = new DpadanabRepo(_BludContext);
            DpadRepo = new DpadRepo(_BludContext);
            DpablndRepo = new DpablndRepo(_BludContext);
            DpadetdRepo = new DpadetdRepo(_BludContext);
            DpadanadRepo = new DpadanadRepo(_BludContext);
            DparRepo = new DparRepo(_BludContext);
            DpablnrRepo = new DpablnrRepo(_BludContext);
            DpadetrRepo = new DpadetrRepo(_BludContext);
            DpadanarRepo = new DpadanarRepo(_BludContext);
            DaftrekeningRepo = new DaftrekeningRepo(_BludContext);
            MkegiatanRepo = new MKegiatanRepo(_BludContext);
            JdanaRepo = new JdanaRepo(_BludContext);
            StdhargaRepo = new StdhargaRepo(_BludContext);
            KegunitRepo = new KegunitRepo(_BludContext);
            MpgrmRepo = new MpgrmRepo(_BludContext);
            UrusanunitRepo = new UrusanunitRepo(_BludContext);
            PgrmunitRepo = new PgrmunitRepo(_BludContext);
            BulanRepo = new BulanRepo(_BludContext);
            JsatuanRepo = new JsatuanRepo(_BludContext);
            SpdRepo = new SpdRepo(_BludContext);
            SpddetbRepo = new SpddetbRepo(_BludContext);
            SpddetrRepo = new SpddetrRepo(_BludContext);
            JusahaRepo = new JusahaRepo(_BludContext);
            DaftbankRepo = new DaftbankRepo(_BludContext);
            Daftphk3Repo = new Daftphk3Repo(_BludContext);
            JbankRepo = new JbankRepo(_BludContext);
            KontrakRepo = new KontrakRepo(_BludContext);
            KontrakdetrRepo = new KontrakdetrRepo(_BludContext);
            StattrsRepo = new StattrsRepo(_BludContext);
            TagihanRepo = new TagihanRepo(_BludContext);
            TagihandetRepo = new TagihandetRepo(_BludContext);
            JtermorlunRepo = new JtermorlunRepo(_BludContext);
            SifatkegRepo = new SifatkegRepo(_BludContext);
            PegawaiRepo = new PegawaiRepo(_BludContext);
            DpaprogramRepo = new DpaprogramRepo(_BludContext);
            DpakegiatanRepo = new DpakegiatanRepo(_BludContext);
            DaftdokRepo = new DaftdokRepo(_BludContext);
            JabttdRepo = new JabttdRepo(_BludContext);
            PemdaRepo = new PemdaRepo(_BludContext);
            GolonganRepo = new GolonganRepo(_BludContext);
            JbendRepo = new JbendRepo(_BludContext);
            BendRepo = new BendRepo(_BludContext);
            TahapRepo = new TahapRepo(_BludContext);
            PaguskpdRepo = new PaguskpdRepo(_BludContext);
            BkbkasRepo = new BkbkasRepo(_BludContext);
            StrurekRepo = new StrurekRepo(_BludContext);
            SppRepo = new SppRepo(_BludContext);
            ZkodeRepo = new ZkodeRepo(_BludContext);
            SppdetbRepo = new SppdetbRepo(_BludContext);
            JtrnlkasRepo = new JtrnlkasRepo(_BludContext);
            JkegRepo = new JkegRepo(_BludContext);
            SppdetrRepo = new SppdetrRepo(_BludContext);
            AdendumRepo = new AdendumRepo(_BludContext);
            SpjRepo = new SpjRepo(_BludContext);
            SpjsppRepo = new SpjsppRepo(_BludContext);
            BpkspjRepo = new BpkspjRepo(_BludContext);
            SpmRepo = new SpmRepo(_BludContext);
            SpmdetdRepo = new SpmdetdRepo(_BludContext);
            SpmdetbRepo = new SpmdetbRepo(_BludContext);
            JnspajakRepo = new JnspajakRepo(_BludContext);
            PajakRepo = new PajakRepo(_BludContext);
            SppdetrpRepo = new SppdetrpRepo(_BludContext);
            Sp2dRepo = new Sp2dRepo(_BludContext);
            BpkRepo = new BpkRepo(_BludContext, _mapper);
            JbayarRepo = new JbayarRepo(_BludContext);
            JtransferRepo = new JtransferRepo(_BludContext);
            Sp2dbpkRepo = new Sp2dbpkRepo(_BludContext);
            BpkdetrRepo = new BpkdetrRepo(_BludContext);
            BkbankRepo = new BkbankRepo(_BludContext);
            BkbankdetRepo = new BkbankdetRepo(_BludContext);
            TbpdetbRepo = new TbpdetbRepo(_BludContext);
            TbpdetdRepo = new TbpdetdRepo(_BludContext);
            TbpdetrRepo = new TbpdetrRepo(_BludContext);
            TbpdettRepo = new TbpdettRepo(_BludContext);
            TbpdettkegRepo = new TbpdettkegRepo(_BludContext);
            TbpRepo = new TbpRepo(_BludContext);
            TbplRepo = new TbplRepo(_BludContext);
            TbpldetRepo = new TbpldetRepo(_BludContext);
            TbpldetkegRepo = new TbpldetkegRepo(_BludContext);
            BkubankRepo = new BkubankRepo(_BludContext);
            BkubpkRepo = new BkubpkRepo(_BludContext);
            BkudRepo = new BkudRepo(_BludContext);
            BkukRepo = new BkukRepo(_BludContext);
            BkupajakRepo = new BkupajakRepo(_BludContext);
            Bkusp2DRepo = new Bkusp2dRepo(_BludContext);
            BkustsRepo = new BkustsRepo(_BludContext);
            BkutbpRepo = new BkutbpRepo(_BludContext);
            BpkpajakRepo = new BpkpajakRepo(_BludContext);
            PanjarRepo = new PanjarRepo(_BludContext);
            PanjardetRepo = new PanjardetRepo(_BludContext);
            BkupanjarRepo = new BkupanjarRepo(_BludContext);
            BkuRepo = new BkuRepo(_BludContext);
            BkpajakRepo = new BkpajakRepo(_BludContext);
            BkpajakdetstrRepo = new BkpajakdetstrRepo(_BludContext);
            SkpRepo = new SkpRepo(_BludContext);
            SkpdetRepo = new SkpdetRepo(_BludContext);
            StsRepo = new StsRepo(_BludContext); ;
            StsdetbRepo = new StsdetbRepo(_BludContext);
            StsdetdRepo = new StsdetdRepo(_BludContext);
            StsdetrRepo = new StsdetrRepo(_BludContext);
            StsdettRepo = new StsdettRepo(_BludContext);
            TbpstsRepo = new TbpstsRepo(_BludContext);
            SkpstsRepo = new SkpstsRepo(_BludContext);
            JbmRepo = new JbmRepo(_BludContext);
            BktmemRepo = new BktmemRepo(_BludContext);
            BktmemdetbRepo = new BktmemdetbRepo(_BludContext);
            BktmemdetrRepo = new BktmemdetrRepo(_BludContext);
            BktmemdetdRepo = new BktmemdetdRepo(_BludContext);
            BktmemdetnRepo = new BktmemdetnRepo(_BludContext);
            JnsakunRepo = new JnsakunRepo(_BludContext);
            JurnalRepo = new JurnalRepo(_BludContext);
            PrognosisbRepo = new PrognosisbRepo(_BludContext);
            PrognosisdRepo = new PrognosisdRepo(_BludContext);
            PrognosisrRepo = new PrognosisrRepo(_BludContext);
            SaldoawallraRepo = new SaldoawallraRepo(_BludContext);
            SaldoawalnrcRepo = new SaldoawalnrcRepo(_BludContext);
            SaldoawalloRepo = new SaldoawalloRepo(_BludContext);
            JnslakRepo = new JnslakRepo(_BludContext);
            DaftreklakRepo = new DaftreklakRepo(_BludContext);
            LpjRepo = new LpjRepo(_BludContext);
            SpjlpjRepo = new SpjlpjRepo(_BludContext);
            SpjtrRepo = new SpjtrRepo(_BludContext);
            BkutbpspjtrRepo = new BkutbpspjtrRepo(_BludContext);
            BkustsspjtrRepo = new BkustsspjtrRepo(_BludContext);
            JbkasRepo = new JbkasRepo(_BludContext);
            DpRepo = new DpRepo(_BludContext);
            DpdetRepo = new DpdetRepo(_BludContext);
            JkinkegRepo = new JkinkegRepo(_BludContext);
            KinkegRepo = new KinkegRepo(_BludContext);
            KegsbdanaRepo = new KegsbdanaRepo(_BludContext);
            RkatapdbRepo = new RkatapdbRepo(_BludContext);
            RkatapddRepo = new RkatapddRepo(_BludContext);
            RkatapdrRepo = new RkatapdrRepo(_BludContext);
            RkatapddetbRepo = new RkatapddetbRepo(_BludContext);
            RkatapddetdRepo = new RkatapddetdRepo(_BludContext);
            RkatapddetrRepo = new RkatapddetrRepo(_BludContext);
            RkasahRepo = new RkasahRepo(_BludContext);
            WebsetRepo = new WebsetRepo(_BludContext);
            CheckdokRepo = new CheckdokRepo(_BludContext);
            SppcheckdokRepo = new SppcheckdokRepo(_BludContext);
            StruunitRepo = new StruunitRepo(_BludContext);
            JrekRepo = new JrekRepo(_BludContext);
            BpkpajakdetRepo = new BpkpajakdetRepo(_BludContext);
            BpkpajakstrRepo = new BpkpajakstrRepo(_BludContext);
            BpkpajakstrdetRepo = new BpkpajakstrdetRepo(_BludContext);
            Sp2DcheckdokRepo = new Sp2dcheckdokRepo(_BludContext);
            Sp2dNtpnRepo = new Sp2dNtpnRepo(_BludContext);
            SkptbpRepo = new SkptbpRepo(_BludContext);
            DaftbarangRepo = new DaftbarangRepo(_BludContext);
            SshRepo = new SshRepo(_BludContext);
            SshrekRepo = new SshrekRepo(_BludContext);
            SetdlraloRepo = new SetdlraloRepo(_BludContext);
            SetrlraloRepo = new SetrlraloRepo(_BludContext);
            SetupdloRepo = new SetupdloRepo(_BludContext);
            SetuprloRepo = new SetuprloRepo(_BludContext);
            SetkorolariRepo = new SetkorolariRepo(_BludContext);
            SetnrcmapRepo = new SetnrcmapRepo(_BludContext);
            SetblakRepo = new SetblakRepo(_BludContext);
            SetrlakRepo = new SetrlakRepo(_BludContext);
            SetdlakRepo = new SetdlakRepo(_BludContext);
            SpptagRepo = new SpptagRepo(_BludContext);
            SetkdpRepo = new SetkdpRepo(_BludContext);
            AtasbendRepo = new AtasbendRepo(_BludContext);
            PotonganRepo = new PotonganRepo(_BludContext);
            SppdetrpotRepo = new SppdetrpotRepo(_BludContext);
            PpkRepo = new PpkRepo(_BludContext);
            SetdapbdrbaRepo = new SetdapbdrbaRepo(_BludContext);
            SetrapbdrbaRepo = new SetrapbdrbaRepo(_BludContext);
            SetpendbljRepo = new SetpendbljRepo(_BludContext);
            SetmappfkRepo = new SetmappfkRepo(_BludContext);
            SpjapbdRepo = new SpjapbdRepo(_BludContext);
            SpjapbddetRepo = new SpjapbddetRepo(_BludContext);
            Sp3BRepo = new Sp3bRepo(_BludContext);
            Sp2BRepo = new Sp2bRepo(_BludContext);
            Sp3BdetRepo = new Sp3bdetRepo(_BludContext);
            Sp2BdetRepo = new Sp2bdetRepo(_BludContext);
            SaldoawallakRepo = new SaldoawallakRepo(_BludContext);
        }
        public async Task<bool> Complete()
        {
            return await _BludContext.SaveChangesAsync() > 0;
        }
    }
}
