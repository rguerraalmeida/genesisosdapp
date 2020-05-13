using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ark_utilities_web.api.Business;
using ark_utilities_web.api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;

namespace ark_utilities_web.api.Controllers
{
    
    [ApiController]
    //[Route("[controller]")]
    [Route("api/[controller]")]
    public class ArkUtilitiesController : ControllerBase
    {
        private readonly ILogger<ArkUtilitiesController> _logger;
        private readonly IMemoryCache _cache;
       
        public ArkUtilitiesController(ILogger<ArkUtilitiesController> logger, IMemoryCache memoryCache)
        {
            _logger = logger;
            _cache = memoryCache;
        }

        // GET: api/ArkUtilities
        public IEnumerable<Dino> Get()
        {
            ArkUtilitiesBusiness arkUtilitiesBusiness = new ArkUtilitiesBusiness(_cache);
            return arkUtilitiesBusiness.GetDinosaurs().Result;
        }

        // GET: api/ArkUtilities/5
        [HttpGet("{searchparams}", Name = "Get")]
        public IEnumerable<Dino> Get(string searchparams)
        {
            ArkUtilitiesBusiness arkUtilitiesBusiness = new ArkUtilitiesBusiness(_cache);
            return arkUtilitiesBusiness.SearchDinosaurs(searchparams).Result;
        }

        // GET: api/ArkUtilities
        [Route("simplified")]
        [HttpGet()]
        public IEnumerable<SimplifiedDino> GetNames()
        {
            ArkUtilitiesBusiness arkUtilitiesBusiness = new ArkUtilitiesBusiness(_cache);
            return arkUtilitiesBusiness.GetNamesAndLocation().Result;
        }


        //// POST: api/ArkUtilities
        //[HttpPost]
        //public void Post([FromBody] string value)
        //{
        //}

        //// PUT: api/ArkUtilities/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
