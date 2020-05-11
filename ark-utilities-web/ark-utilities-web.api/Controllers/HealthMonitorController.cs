using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ark_utilities_web.api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthMonitorController : ControllerBase
    {
        [HttpGet]
        public string Get()
        {
            return "Applicattion Health Status: OK " + DateTime.Now.ToString();
        }

    }
}
