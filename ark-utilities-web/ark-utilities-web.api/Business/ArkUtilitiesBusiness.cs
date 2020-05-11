using ark_utilities_web.api.DataAgents;
using ark_utilities_web.api.Model;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ark_utilities_web.api.Business
{
    public class ArkUtilitiesBusiness
    {
        public async Task<IEnumerable<LostDino>> GetMissingDinosaursList()
        {
            DropboxDataAgent dropboxDataAgent = new DropboxDataAgent();
            string dinos = await dropboxDataAgent.DownloadDinosaursFile();
            List<LostDino> lostDinos = JsonConvert.DeserializeObject<List<LostDino>>(dinos);
            return lostDinos;

            //return dinos;
        }

    }
}
