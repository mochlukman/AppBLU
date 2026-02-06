using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RKPD.API.Helpers;
using BLUDBE.Dto;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.RKA
{
    [Route("api/[controller]")]
    [ApiController]
    public class RkadetrController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly BludContext _context;
        public RkadetrController(IUow uow, IMapper mapper, BludContext context)
        {
            _uow = uow;
            _mapper = mapper;
            _context = context;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<RkadetrGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Rkadetr> data = await _uow.RkadetrRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RkadetrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetr Post = _mapper.Map<Rkadetr>(param);
            if(String.IsNullOrEmpty(param.Idrkadetrduk.ToString())) Post.Idrkadetrduk = 0;
            Post.Createdby = User.Claims.FirstOrDefault().Value;
            Post.Createddate = DateTime.Now;
            Post.Kdjabar = Post.Kdjabar.Trim();
            if (Post.Kdjabar.Trim().ToLower().Contains("x"))
                return BadRequest("Kode tidak Valid");
            bool exist = await _uow.RkadetrRepo.isExist(w => w.Idrkar == param.Idrkar && w.Kdjabar.Trim() == param.Kdjabar.Trim());
            if (exist)
                return BadRequest("Kode Telah Digunakan");
            string titik = Post.Kdjabar.Substring((Post.Kdjabar.Length - 1));
            if (titik != ".")
                return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
            Post.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(Post.Ekspresi);
            Post.Subtotal = Post.Tarif * Post.Jumbyek;
            try
            {
                Rkar parent = await _uow.RkarRepo.Get(w => w.Idrkar == Post.Idrkar);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Rkadetr Insert = await _uow.RkadetrRepo.Add(Post);
                        if (Insert != null)
                        {
                            if (Insert.Idrkadetrduk != 0)
                            {
                                _uow.RkadetrRepo.UpdateToHeader((long)Insert.Idrkadetrduk);
                            }
                            _uow.RkadetrRepo.GetLastChild(Insert.Idrkadetr);
                        }
                        _uow.RkarRepo.CalculateNilai(Insert.Idrkar);
                        Rkar dataRka = await _uow.RkarRepo.Get(w => w.Idrkar == param.Idrkar);
                        Kegunit cKeg = await _uow.KegunitRepo.Get((long)dataRka.Idkegunit);
                        var PaguKegiatan = cKeg.Pagu;
                        var totalNilai = await _uow.RkarRepo.TotalNilai(parent.Idunit,parent.Idkeg, parent.Kdtahap);
                        //var totalNilai = await _uow.RkarRepo.TotalNilai(dataRka.Idunit, parent.Idkeg, dataRka.Kdtahap);
                        if (totalNilai > PaguKegiatan)
                        {
                            transaction.Rollback();
                            return BadRequest("Total Nilai Penjabaran : " + totalNilai.ToString() + ", Melebihi Pagu Kegiatan : " + PaguKegiatan.ToString());
                        }
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction
                        {
                            Idrka = Post.Idrkar,
                            Nilai = parent.Nilai,
                            GrandTotalChild = await _uow.RkarRepo.TotalNilai(parent.Idunit,parent.Idkeg, parent.Kdtahap)
                        });
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        transaction.Rollback();
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody]RkadetrPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetr Post = _mapper.Map<Rkadetr>(param);
            if (String.IsNullOrEmpty(param.Idrkadetrduk.ToString())) Post.Idrkadetrduk = 0;
            Post.Updateby = User.Claims.FirstOrDefault().Value;
            Post.Updatetime = DateTime.Now;
            Post.Kdjabar = Post.Kdjabar.Trim();
            if (Post.Kdjabar.Trim().ToLower().Contains("x"))
                return BadRequest("Kode tidak Valid");
            bool exist = await _uow.RkadetrRepo.isExist(w => w.Idrkar == param.Idrkar && w.Kdjabar.Trim() == param.Kdjabar.Trim() && w.Idrkadetr != param.Idrkadetr);
            if (exist)
                return BadRequest("Kode Telah Digunakan");
            string titik = Post.Kdjabar.Substring((Post.Kdjabar.Length - 1));
            if (titik != ".")
                return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
            Post.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(Post.Ekspresi);
            Post.Subtotal = Post.Tarif * Post.Jumbyek;
            try
            {
                Rkar parent = await _uow.RkarRepo.Get(w => w.Idrkar == Post.Idrkar);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        bool Update = await _uow.RkadetrRepo.Update(Post);
                        if (Update)
                        {
                            if (Post.Idrkadetrduk != 0)
                            {
                                _uow.RkadetrRepo.UpdateToHeader((long)Post.Idrkadetrduk);

                            }
                            _uow.RkadetrRepo.GetLastChild(Post.Idrkadetr);
                        }
                        _uow.RkarRepo.CalculateNilai(Post.Idrkar);
                        Rkar dataRka = await _uow.RkarRepo.Get(w => w.Idrkar == param.Idrkar);
                        Kegunit cKeg = await _uow.KegunitRepo.Get((long)dataRka.Idkegunit);
                        var PaguKegiatan = cKeg.Pagu;
                        var totalNilai = await _uow.RkarRepo.TotalNilai(parent.Idunit, parent.Idkeg,parent.Kdtahap);
                        if (totalNilai > PaguKegiatan)
                        {
                            transaction.Rollback();
                            return BadRequest("Total Nilai Penjabaran : " + totalNilai.ToString() + ", Melebihi Pagu Kegiatan : " + PaguKegiatan.ToString());
                        }
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction
                        {
                            Idrka = Post.Idrkar,
                            Nilai = parent.Nilai,
                            GrandTotalChild = await _uow.RkarRepo.TotalNilai(parent.Idunit,parent.Idkeg, parent.Kdtahap)
                        });
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        transaction.Rollback();
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Idrkadetr}")]
        public async Task<IActionResult> Delete(long Idrkadetr)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetr data = await _uow.RkadetrRepo.Get(w => w.Idrkadetr == Idrkadetr);
            if (data == null)
                return BadRequest("Data Tidak Ditemukan");
            List<Rkadetr> childs = await _uow.RkadetrRepo.Gets(w => w.Idrkadetrduk == data.Idrkadetr);
            if (childs.Count() > 0)
                return BadRequest("Gagal Hapus, Data Memiliki Sub");
            Rkadetr parent = await _uow.RkadetrRepo.Get(w => w.Idrkadetr == data.Idrkadetrduk);
            try
            {
                Rkar parents = await _uow.RkarRepo.Get(w => w.Idrkar == data.Idrkar);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        _uow.RkadetrRepo.Remove(data);
                        await _uow.Complete();
                        if (data.Idrkadetrduk != 0)
                        {
                            _uow.RkadetrRepo.UpdateToHeader((long)data.Idrkadetrduk);

                        }
                        _uow.RkadetrRepo.GetLastChild(data.Idrkadetr);
                        _uow.RkarRepo.CalculateNilai(data.Idrkar);
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction
                        {
                            Idrka = data.Idrkar,
                            Nilai = parents.Nilai,
                            GrandTotalChild = await _uow.RkarRepo.TotalNilai(parents.Idunit,parents.Idkeg, parents.Kdtahap)
                        });
                    }
                    catch (Exception e)
                    {
                        ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                        transaction.Rollback();
                        return BadRequest(ModelState);
                    }
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}