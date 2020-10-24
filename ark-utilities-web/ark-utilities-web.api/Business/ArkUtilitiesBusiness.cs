using ark_utilities_web.api.DataAgents;
using ark_utilities_web.api.Model;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ark_utilities_web.api.Business
{
    public class ArkUtilitiesBusiness
    {
        private readonly IMemoryCache _cache;

        public ArkUtilitiesBusiness(IMemoryCache memoryCache)
        {
            _cache = memoryCache;
        }

        public async Task<IEnumerable<Dino>> GetDinosaurs()
        {

            string dinos = await LoadDinosFromStore();
            List<Dino> lostDinos = ConvertDinosJson(dinos);
            return lostDinos;
        }
        public async Task<IEnumerable<SimplifiedDino>> GetNamesAndLocation()
        {

            string dinos = await LoadDinosFromStore();
            List<Dino> lostDinos = ConvertDinosJson(dinos);
            return lostDinos.Select(s => new SimplifiedDino() { Sheet = s.Sheet, Name = s.Name, X = s.X, Y = s.Y });
        }

        public async Task<IEnumerable<Dino>> SearchDinosaurs(string searchparam)
        {
            IEnumerable<Dino> lostDinos = await GetDinosaurs();
            
            List<Dino> searchedDinos = new List<Dino>();
            searchedDinos.AddRange(lostDinos.Where(x => !string.IsNullOrWhiteSpace(x.Class) &&  x.Class.ToLowerInvariant().Contains(searchparam.ToLowerInvariant())));
            searchedDinos.AddRange(lostDinos.Where(x => !string.IsNullOrWhiteSpace(x.Name) && x.Name.ToLowerInvariant().Contains(searchparam.ToLowerInvariant())));
            searchedDinos.AddRange(lostDinos.Where(x => !string.IsNullOrWhiteSpace(x.TribeName) &&  x.TribeName.ToLowerInvariant().Contains(searchparam.ToLowerInvariant())));
            searchedDinos.AddRange(lostDinos.Where(x => !string.IsNullOrWhiteSpace(x.Sheet) && x.Sheet.ToLowerInvariant().Contains(searchparam.ToLowerInvariant())));
            //searchedDinos.AddRange(lostDinos.Where(x => x.Sheet.Contains(searchparam)));

            return searchedDinos.AsEnumerable();
        }

        private async Task<string> LoadDinosFromStore()
        {
            //the excel file is exported all days at 5:01 UK time, since i dont know if time as DST applied i change cache at 7:30 GMT
            // will have to check with Server Admin to match updates in the future

            string dinos = string.Empty;

          
            DateTime excelUpdateDateTime = DateTime.UtcNow.Date.AddHours(7).AddMinutes(30);
            DateTime lastCachedDate;
            DateTime now = DateTime.UtcNow;

            var exists = _cache.TryGetValue("lastCachedDate", out lastCachedDate);

            bool mustUpdate = false;

            if (!exists)
            {
                mustUpdate = true;
            }
            else if (exists && (lastCachedDate < excelUpdateDateTime) && (now > excelUpdateDateTime))
            {
                mustUpdate = true;
            }

            if (mustUpdate)
            {
                DropboxDataAgent dropboxDataAgent = new DropboxDataAgent();
                dinos = await dropboxDataAgent.DownloadDinosaursFile();

                if (!string.IsNullOrEmpty(dinos))
                {
                    _cache.Set("ListOfMissingDinos", dinos);
                    _cache.Set("lastCachedDate", now);
                }
            }
            else
            {
                var dinosExists = _cache.TryGetValue("ListOfMissingDinos", out dinos);
                
                if (!dinosExists)
                {
                    DropboxDataAgent dropboxDataAgent = new DropboxDataAgent();
                    dinos = await dropboxDataAgent.DownloadDinosaursFile();

                    if (!string.IsNullOrEmpty(dinos))
                    {
                        _cache.Set("ListOfMissingDinos", dinos);
                        _cache.Set("lastCachedDate", now);
                    }
                }
            }

            return dinos;
        }

        private List<Dino> ConvertDinosJson(string dinos)
        {
            return JsonConvert.DeserializeObject<List<Dino>>(dinos);
        }


    }
}
