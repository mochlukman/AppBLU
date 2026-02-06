using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLUDBE.Helper;

namespace BLUDBE.Controllers
{
    [Route("api/[controller]"), AllowAnonymous]
    [ApiController]
    public class ATestingController : ControllerBase
    {
        public ATestingController()
        {

        }
    }
}