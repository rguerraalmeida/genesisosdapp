using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using ark_utilities_web.api.Business;
using ark_utilities_web.api.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ark_utilities_web.api.Controllers
{
 
    [ApiController]
    //[Route("[controller]")]
    [Route("api/[controller]")]
    public class ArkUtilitiesController : ControllerBase
    {
        // GET: api/ArkUtilities
        [HttpGet]
        public IEnumerable<LostDino> Get()
        {
            ArkUtilitiesBusiness arkUtilitiesBusiness = new ArkUtilitiesBusiness();
            return arkUtilitiesBusiness.GetMissingDinosaursList().Result;
        }

        //// GET: api/ArkUtilities/5
        //[HttpGet("{id}", Name = "Get")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

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
