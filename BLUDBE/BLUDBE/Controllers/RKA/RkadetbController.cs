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
    public class RkadetbController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly BludContext _context;
        public RkadetbController(IUow uow, IMapper mapper, BludContext context)
        {
            _uow = uow;
            _mapper = mapper;
            _context = context;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<RkadetbGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Rkadetb> data = await _uow.RkadetbRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RkadetbPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetb Post = _mapper.Map<Rkadetb>(param);
            if (String.IsNullOrEmpty(param.Idrkadetbduk.ToString())) Post.Idrkadetbduk = 0;
            Post.Createdby = User.Claims.FirstOrDefault().Value;
            Post.Createddate = DateTime.Now;
            Post.Kdjabar = Post.Kdjabar.Trim();
            if (Post.Kdjabar.Trim().ToLower().Contains("x"))
                return BadRequest("Kode tidak Valid");
            bool exist = await _uow.RkadetbRepo.isExist(w => w.Idrkab == param.Idrkab && w.Kdjabar.Trim() == param.Kdjabar.Trim());
            if (exist)
                return BadRequest("Kode Telah Digunakan");
            string titik = Post.Kdjabar.Substring((Post.Kdjabar.Length - 1));
            if (titik != ".")
                return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
            Post.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(Post.Ekspresi);
            Post.Subtotal = Post.Tarif * Post.Jumbyek;
            try
            {
                Rkab parent = await _uow.RkabRepo.Get(w => w.Idrkab == Post.Idrkab);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Rkadetb Insert = await _uow.RkadetbRepo.Add(Post);
                        if (Insert != null)
                        {
                            if (Insert.Idrkadetbduk != 0)
                            {
                                _uow.RkadetbRepo.UpdateToHeader((long)Insert.Idrkadetbduk);
                            }
                            _uow.RkadetbRepo.GetLastChild(Insert.Idrkadetb);
                        }
                        _uow.RkabRepo.CalculateNilai(Insert.Idrkab);
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction
                        {
                            Idrka = Post.Idrkab,
                            Nilai = parent.Nilai,
                            GrandTotalChild = await _uow.RkabRepo.TotalNilai(parent.Idunit, parent.Trkr)
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
        public async Task<IActionResult> Put([FromBody]RkadetbPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetb Post = _mapper.Map<Rkadetb>(param);
            if (String.IsNullOrEmpty(param.Idrkadetbduk.ToString())) Post.Idrkadetbduk = 0;
            Post.Updateby = User.Claims.FirstOrDefault().Value;
            Post.Updatetime = DateTime.Now;
            Post.Kdjabar = Post.Kdjabar.Trim();
            if (Post.Kdjabar.Trim().ToLower().Contains("x"))
                return BadRequest("Kode tidak Valid");
            bool exist = await _uow.RkadetbRepo.isExist(w => w.Idrkab == param.Idrkab && w.Kdjabar.Trim() == param.Kdjabar.Trim() && w.Idrkadetb != param.Idrkadetb);
            if (exist)
                return BadRequest("Kode Telah Digunakan");
            string titik = Post.Kdjabar.Substring((Post.Kdjabar.Length - 1));
            if (titik != ".")
                return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
            Post.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(Post.Ekspresi);
            Post.Subtotal = Post.Tarif * Post.Jumbyek;
            try
            {
                Rkab parent = await _uow.RkabRepo.Get(w => w.Idrkab == Post.Idrkab);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        bool Update = await _uow.RkadetbRepo.Update(Post);
                        if (Update)
                        {
                            if (Post.Idrkadetbduk != 0)
                            {
                                _uow.RkadetbRepo.UpdateToHeader((long)Post.Idrkadetbduk);

                            }
                            _uow.RkadetbRepo.GetLastChild(Post.Idrkadetb);
                        }
                        _uow.RkabRepo.CalculateNilai(Post.Idrkab);
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction
                        {
                            Idrka = Post.Idrkab,
                            Nilai = parent.Nilai,
                            GrandTotalChild = await _uow.RkabRepo.TotalNilai(parent.Idunit, parent.Trkr)
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
        [HttpDelete("{Idrkadetb}")]
        public async Task<IActionResult> Delete(long Idrkadetb)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetb data = await _uow.RkadetbRepo.Get(w => w.Idrkadetb == Idrkadetb);
            if (data == null)
                return BadRequest("Data Tidak Ditemukan");
            List<Rkadetb> childs = await _uow.RkadetbRepo.Gets(w => w.Idrkadetbduk == data.Idrkadetb);
            if (childs.Count() > 0)
                return BadRequest("Gagal Hapus, Data Memiliki Sub");
            Rkadetb parent = await _uow.RkadetbRepo.Get(w => w.Idrkadetb == data.Idrkadetbduk);
            try
            {
                Rkab parents = await _uow.RkabRepo.Get(w => w.Idrkab == data.Idrkab);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        _uow.RkadetbRepo.Remove(data);
                        await _uow.Complete();
                        if (data.Idrkadetbduk != 0)
                        {
                            _uow.RkadetbRepo.UpdateToHeader((long)data.Idrkadetbduk);

                        }
                        _uow.RkadetbRepo.GetLastChild(data.Idrkadetb);
                        _uow.RkabRepo.CalculateNilai(data.Idrkab);
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction
                        {
                            Idrka = data.Idrkab,
                            Nilai = parents.Nilai,
                            GrandTotalChild = await _uow.RkabRepo.TotalNilai(parents.Idunit, parents.Trkr)
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