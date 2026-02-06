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
    public class RkadetdController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly BludContext _context;
        public RkadetdController(IUow uow, IMapper mapper, BludContext context)
        {
            _uow = uow;
            _mapper = mapper;
            _context = context;
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<RkadetdGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Rkadetd> data = await _uow.RkadetdRepo.Paging(param);
                return Ok(data);
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody]RkadetdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetd Post = _mapper.Map<Rkadetd>(param);
            if (String.IsNullOrEmpty(param.Idrkadetdduk.ToString())) Post.Idrkadetdduk = 0;
            Post.Createdby = User.Claims.FirstOrDefault().Value;
            Post.Createddate = DateTime.Now;
            Post.Kdjabar = Post.Kdjabar.Trim();
            if (Post.Kdjabar.Trim().ToLower().Contains("x"))
                return BadRequest("Kode tidak Valid");
            bool exist = await _uow.RkadetdRepo.isExist(w => w.Idrkad == param.Idrkad && w.Kdjabar.Trim() == param.Kdjabar.Trim());
            if (exist)
                return BadRequest("Kode Telah Digunakan");
            string titik = Post.Kdjabar.Substring((Post.Kdjabar.Length - 1));
            if (titik != ".")
                return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
            Post.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(Post.Ekspresi);
            Post.Subtotal = Post.Tarif * Post.Jumbyek;
            try
            {
                Rkad parent = await _uow.RkadRepo.Get(w => w.Idrkad == Post.Idrkad);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        Rkadetd Insert = await _uow.RkadetdRepo.Add(Post);
                        if(Insert != null)
                        {
                            if(Insert.Idrkadetdduk != 0)
                            {
                                _uow.RkadetdRepo.UpdateToHeader((long)Insert.Idrkadetdduk);
                            }
                            _uow.RkadetdRepo.GetLastChild(Insert.Idrkadetd);
                        }
                        _uow.RkadRepo.CalculateNilai(Insert.Idrkad);
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction
                        {
                            Idrka = Post.Idrkad,
                            Nilai = parent.Nilai,
                            GrandTotalChild = await _uow.RkadRepo.TotalNilai(parent.Idunit, parent.Idrkadx)
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
        public async Task<IActionResult> Put([FromBody]RkadetdPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetd Post = _mapper.Map<Rkadetd>(param);
            if (String.IsNullOrEmpty(param.Idrkadetdduk.ToString())) Post.Idrkadetdduk = 0;
            Post.Updateby = User.Claims.FirstOrDefault().Value;
            Post.Updatetime = DateTime.Now;
            Post.Kdjabar = Post.Kdjabar.Trim();
            if (Post.Kdjabar.Trim().ToLower().Contains("x"))
                return BadRequest("Kode tidak Valid");
            bool exist = await _uow.RkadetdRepo.isExist(w => w.Idrkad == param.Idrkad && w.Kdjabar.Trim() == param.Kdjabar.Trim() && w.Idrkadetd != param.Idrkadetd);
            if (exist)
                return BadRequest("Kode Telah Digunakan");
            string titik = Post.Kdjabar.Substring((Post.Kdjabar.Length - 1));
            if (titik != ".")
                return BadRequest("Gunakan Titik Pada Bagian Terakhir Kode Jabar");
            Post.Jumbyek = (decimal?)Ekpresi.ParseEkspresi(Post.Ekspresi);
            Post.Subtotal = Post.Tarif * Post.Jumbyek;
            try
            {
                Rkad parent = await _uow.RkadRepo.Get(w => w.Idrkad == Post.Idrkad);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        bool Update = await _uow.RkadetdRepo.Update(Post);
                        if (Update)
                        {
                            if (Post.Idrkadetdduk != 0)
                            {
                                _uow.RkadetdRepo.UpdateToHeader((long)Post.Idrkadetdduk);
                                
                            }
                            _uow.RkadetdRepo.GetLastChild(Post.Idrkadetd);
                        }
                        _uow.RkadRepo.CalculateNilai(Post.Idrkad);
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction {
                            Idrka = Post.Idrkad,
                            Nilai = parent.Nilai,
                            GrandTotalChild = await _uow.RkadRepo.TotalNilai(parent.Idunit, parent.Idrkadx)
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
        [HttpDelete("{Idrkadetd}")]
        public async Task<IActionResult> Delete(long Idrkadetd)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Rkadetd data = await _uow.RkadetdRepo.Get(w => w.Idrkadetd == Idrkadetd);
            if (data == null)
                return BadRequest("Data Tidak Ditemukan");
            List<Rkadetd> childs = await _uow.RkadetdRepo.Gets(w => w.Idrkadetdduk == data.Idrkadetd);
            if (childs.Count() > 0)
                return BadRequest("Gagal Hapus, Data Memiliki Sub");
            Rkadetd parent = await _uow.RkadetdRepo.Get(w => w.Idrkadetd == data.Idrkadetdduk);
            try
            {
                Rkad parents = await _uow.RkadRepo.Get(w => w.Idrkad == data.Idrkad);
                using (var transaction = await _context.Database.BeginTransactionAsync())
                {
                    try
                    {
                        _uow.RkadetdRepo.Remove(data);
                        await _uow.Complete();
                        if (data.Idrkadetdduk != 0)
                        {
                            _uow.RkadetdRepo.UpdateToHeader((long)data.Idrkadetdduk);

                        }
                        _uow.RkadetdRepo.GetLastChild(data.Idrkadetd);
                        _uow.RkadRepo.CalculateNilai(data.Idrkad);
                        transaction.Commit();
                        return Ok(new RkaReturnTransaction
                        {
                            Idrka = data.Idrkad,
                            Nilai = parents.Nilai,
                            GrandTotalChild = await _uow.RkadRepo.TotalNilai(parents.Idunit, parents.Idrkadx)
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