using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Common;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Dapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Dto;
using BLUDBE.Enums;
using BLUDBE.Interface;
using BLUDBE.Models;
using BLUDBE.Params;

namespace BLUDBE.Controllers.DPA
{
    [Route("api/[controller]")]
    [ApiController]
    public class DpaController : ControllerBase
    {
        private readonly IUow _uow;
        private readonly IMapper _mapper;
        private readonly DbConnection _dbConnection;
        private readonly BludContext _BludContext;
        public DpaController(IUow uow, IMapper mapper, DbConnection dbConnection, BludContext BludContext)
        {
            _uow = uow;
            _mapper = mapper;
            _dbConnection = dbConnection;
            _BludContext = BludContext;
        }
        [HttpGet]
        public async Task<IActionResult> Gets([FromQuery]DpaGet param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                List<Dpa> data = await _uow.DpaRepo.ViewDatas(param);
                return Ok(data);
            }catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpGet("paging")]
        public async Task<IActionResult> Paging([FromQuery]PrimengTableParam<DpaGet> param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            try
            {
                PrimengTableResult<Dpa> data = await _uow.DpaRepo.Paging(param);
                return Ok(data);
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DpaPost param)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            Dpa check = await _uow.DpaRepo.Get(w => w.Nodpa.Trim() == param.Nodpa.Trim() && w.Idunit == param.Idunit && w.Kdtahap.Trim() == param.Kdtahap.Trim());
            if (check != null)
                return BadRequest("Duplikat Data, No DPA Telah Digunakan");
            Dpa Post = _mapper.Map<Dpa>(param);
            Post.Datecreate = DateTime.Now;
            var SpName = "WSP_DPATRANSFER";
            try
            {
                Dpa Insert = await _uow.DpaRepo.Add(Post);
                if(Insert != null)
                {
                    using (IDbConnection dbConnection = _dbConnection)
                    {
                        dbConnection.Open();
                        var parameters = new DynamicParameters();
                        parameters.Add("@Idunit", Insert.Idunit);
                        parameters.Add("@Kdtahap", Insert.Kdtahap.Trim());
                        parameters.Add("@Iddpa", Insert.Iddpa);
                        await dbConnection.ExecuteAsync(SpName, parameters, commandType: CommandType.StoredProcedure);
                        dbConnection.Close();
                    }
                    return Ok(await _uow.DpaRepo.ViewData(Insert.Iddpa));
                } else
                {
                    Dpa newData = await _uow.DpaRepo.Get(w => w.Iddpa == Insert.Iddpa);
                    _uow.DpaRepo.Remove(newData);
                    await _uow.Complete();
                    ModelState.AddModelError("error", "Input Gagal");
                    return BadRequest(ModelState);
                }
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] DpaPost param)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            Dpa Post = _mapper.Map<Dpa>(param);
            Dpa check = await _uow.DpaRepo.Get(w => w.Nodpa.Trim() == Post.Nodpa.Trim() && w.Idunit == Post.Idunit && w.Kdtahap.Trim() == Post.Kdtahap.Trim());
            if (check != null)
            {
                if(check.Iddpa != Post.Iddpa)
                {
                    return BadRequest("Duplikat Data, No DPA Telah Digunakan");
                }
            }
            Post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.DpaRepo.Update(Post);
                if (update)
                {
                    return Ok(await _uow.DpaRepo.ViewData(Post.Iddpa));
                }
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("update-nilai")]
        public async Task<IActionResult> UpdateNilai([FromBody]DpaUpdateNilai param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Dpa post = _mapper.Map<Dpa>(param);
            post.Dateupdate = DateTime.Now;
            try
            {
                bool update = await _uow.DpaRepo.UpdateNilai(post);
                if (update)
                    return Ok(await _uow.DpaRepo.ViewData(post.Iddpa));
                return BadRequest("Update Nilai Gagal");
            }
            catch(Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpDelete("{Iddpa}")]
        public async Task<IActionResult> Delete(long Iddpa)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);
            try
            {
                long dpabs = await _uow.DpabRepo.Count(w => w.Iddpa == Iddpa);
                long dpars = await _uow.DparRepo.Count(w => w.Iddpa == Iddpa);
                long dpads = await _uow.DpadRepo.Count(w => w.Iddpa == Iddpa);
                if (dpabs > 0 || dpars > 0 || dpads > 0)
                    return BadRequest("Hapus Gagal, SK DPA Telah Digunakan");
                Dpa skdpa = await _uow.DpaRepo.Get(w => w.Iddpa == Iddpa);
                _uow.DpaRepo.Remove(skdpa);
                if (await _uow.Complete())
                    return Ok();
                return BadRequest();
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("pengesahan")]
        public async Task<IActionResult> Pengsahan([FromBody]DpaPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Dpa post = _mapper.Map<Dpa>(param);
            post.Dateupdate = DateTime.Now;
            post.Sahby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool update = await _uow.DpaRepo.Pengesahan(post);
                if (update)
                {
                    return Ok(await _uow.DpaRepo.ViewData(post.Iddpa));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
        [HttpPut("penolakan")]
        public async Task<IActionResult> Penolakan([FromBody]DpaPost param)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Dpa post = _mapper.Map<Dpa>(param);
            post.Dateupdate = DateTime.Now;
            post.Validby = User.Claims.FirstOrDefault().Value;
            try
            {
                bool update = await _uow.DpaRepo.Penolakan(post);
                if (update)
                {
                    return Ok(await _uow.DpaRepo.ViewData(post.Iddpa));
                }
                return BadRequest("Update Gagal");
            }
            catch (Exception e)
            {
                ModelState.AddModelError("error", e.InnerException?.Message ?? e.Message);
                return BadRequest(ModelState);
            }
        }
    }
}