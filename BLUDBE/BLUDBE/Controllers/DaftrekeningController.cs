using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DaftrekeningController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        public DaftrekeningController(IUow uow, IMapper mapper)
        {
            _uow = uow;
            _mapper = mapper;
        }
        [HttpGet("search")]
        public async Task<IActionResult> Search([FromQuery] RekeningSearchParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Daftrekening> data = await _uow.DaftrekeningRepo.Search(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] RekGlobalParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Daftrekening> data = await _uow.DaftrekeningRepo.List(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("start-kode")]
        public async Task<IActionResult> startKode([FromQuery][Required] string kode)
        {
            try
            {
                List<Daftrekening> datas = await _uow.DaftrekeningRepo.StartKode(kode);
                return Ok(datas);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("start-kode/paging")]
        public async Task<IActionResult> startKodePaging([FromQuery][Required] PrimengTableParam<RekeningStartKodeParam> param)
        {
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.StartKodePaging(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-stsdetd")]
        public async Task<IActionResult> byStsdetd([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.ByStsdetd(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("for-stsdetr")]
        public async Task<IActionResult> forStsdetr([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.ForStsdetr(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-spmdetd")]
        public async Task<IActionResult> bySpmdetd([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.BySpmdetd(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-spmdetb")]
        public async Task<IActionResult> bySpmdetb([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.BySpmdetb(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("for-rkad")]
        public async Task<IActionResult> ForRkad([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.ByForRkad(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("for-rkar")]
        public async Task<IActionResult> ForRkar([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.ByForRkar(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("for-rkab")]
        public async Task<IActionResult> ForRkab([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.ByForRkab(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-jnsakun")]
        public async Task<IActionResult> ByJnsakun([FromQuery][Required] string Idjnsakun)
        {
            if (Idjnsakun == "x")
            {
                return BadRequest("Jenis Akun Harus Di isi");
            }
            string[] Idjnsakuns = Idjnsakun.Split(',');
            List<long> ListIds = Idjnsakuns.Select(long.Parse).ToList();
            List<long?> Ids = ListIds.Cast<long?>().ToList();
            try
            {
                List<Daftrekening> datas = await _uow.DaftrekeningRepo.ByJenisAkun(Ids);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-jnsakun-type")]
        public async Task<IActionResult> ByJnsakunType([FromQuery][Required] PrimengTableParam<RekJnsakunTypeParam> param)
        {
            if (param.Parameters.Idjnsakun == "x")
            {
                return BadRequest("Jenis Akun Harus Di isi");
            }
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.ByJenisAkunTypePaging(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-jnsakun-nmper")]
        public async Task<IActionResult> ByJnsakunAndNmper(
            [FromQuery][Required] string Idjnsakun,
            [FromQuery][Required] string Nmper)
        {
            if (Idjnsakun == "x")
            {
                return BadRequest("Jenis Akun Harus Di isi");
            }
            string[] Idjnsakuns = Idjnsakun.Split(',');
            List<long> ListIds = Idjnsakuns.Select(long.Parse).ToList();
            List<long?> Ids = ListIds.Cast<long?>().ToList();
            try
            {
                List<Daftrekening> datas = await _uow.DaftrekeningRepo.ByJenisAkunAndNmper(Ids, Nmper);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-rkar")]
        public async Task<IActionResult> GetByRkar(
            [FromQuery][Required]long Idunit,
            [FromQuery][Required]long Idkeg
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Daftrekening> datas = await _uow.DaftrekeningRepo.GetByRkar(Idunit, Idkeg);                
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-spddetr")]
        public async Task<IActionResult> GetBySpddetr(
               [FromQuery][Required] long Idspd,
               [FromQuery]long Idkeg
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Daftrekening> datas = new List<Daftrekening>();
                List<long> IdReks = await _uow.SpddetrRepo.GetIdReks(Idspd, Idkeg);
                if(IdReks.Count() > 0)
                {
                    datas.AddRange(await _uow.DaftrekeningRepo.Gets(w => IdReks.Contains(w.Idrek)));
                }
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("tree-checkbox-by-dpa")]
        public async Task<IActionResult> TreeCheckboxByDpa(
            [FromQuery][Required] long Idunit,
            [FromQuery][Required] long Idspp,
            [FromQuery][Required] string Kdstatus,
            [FromQuery][Required] long Idxkode,
            [FromQuery]string Kdtahap,
            [FromQuery]int Idnojetra
            )
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            //long Idunit = 1;
            //long Idspp = 2;
            //string Kdtahap = "321";
            //int Idnojetra = 21;
            try
            {
                List<LookupTreeDto> datas = await _uow.DaftrekeningRepo.TreeCheckboxByDpa(Idunit, Idspp, Kdtahap, Idnojetra, Idxkode, Kdstatus);
                return Ok(datas);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("tree-by-bpk"), AllowAnonymous]
        public async Task<IActionResult> TreeByBpk([FromQuery][Required]long Idbpk)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<TreeTableRekeningRoot> datas = await _uow.DaftrekeningRepo.TreeTableRekeningByBpk(Idbpk);
                return Ok(datas);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]DaftrekeningPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Daftrekening post = _mapper.Map<Daftrekening>(param);
            post.Datecreate = DateTime.Now;
            if (post.Kdper.Contains("x"))
            {
                return BadRequest("Kode Tidak Valid");
            }
            bool check_kode = await _uow.DaftrekeningRepo.isExist(w => w.Kdper.Trim() == param.Kdper.Trim());
            if (check_kode) return BadRequest("Kode Sudah Digunakan");
            try
            {
                Daftrekening insert = await _uow.DaftrekeningRepo.Add(post);
                if (insert != null)
                    return Ok(await _uow.DaftrekeningRepo.ViewData(insert.Idrek));
                return BadRequest("Input Gagal");
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]DaftrekeningPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Daftrekening post = _mapper.Map<Daftrekening>(param);
            post.Dateupdate = DateTime.Now;
            if (post.Kdper.Contains("x"))
            {
                return BadRequest("Kode Tidak Valid");
            }
            Daftrekening check_kode = await _uow.DaftrekeningRepo.Get(w => w.Kdper.Trim() == param.Kdper.Trim());
            if (check_kode != null)
            {
                if(check_kode.Idrek != post.Idrek)
                {
                    return BadRequest("Kode Sudah Digunakan");
                }
            } 
            try
            {
                bool update = await _uow.DaftrekeningRepo.Update(post);
                if (update)
                    return Ok(await _uow.DaftrekeningRepo.ViewData(post.Idrek));
                return BadRequest("Input Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idrek}")]
        public async Task<IActionResult> Delete(long Idrek)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                Daftrekening data = await _uow.DaftrekeningRepo.Get(w => w.Idrek == Idrek);
                if (data == null) return BadRequest("Data Tidak Ditemukan");
                long child = await _uow.DaftrekeningRepo.Count(w => w.Kdper.Trim().StartsWith(data.Kdper.Trim()));
                if (child > 1) return BadRequest("Gagal Hapus, Data Memiliki Sub Data");
                _uow.DaftrekeningRepo.Remove(data);
                if (await _uow.Complete()) return Ok();
                return BadRequest("Gagal Hapus");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-dpa")]
        public async Task<IActionResult> GetByDpa([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if(!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.ByDpa(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-dpa-spp")]
        public async Task<IActionResult> GetByDpaSpp([FromQuery][Required] RekDPAParam param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Daftrekening> result = await _uow.DaftrekeningRepo.ByDpaSPP(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("by-dpab")]
        public async Task<IActionResult> GetByDpab([FromQuery][Required] PrimengTableParam<RekGlobalParam> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Daftrekening> result = await _uow.DaftrekeningRepo.ByDpaB(param);
                return Ok(result);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}