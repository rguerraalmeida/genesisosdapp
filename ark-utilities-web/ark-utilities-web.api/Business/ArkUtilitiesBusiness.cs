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

        public async Task<IEnumerable<LostDino>> GetMissingDinosaursList()
        {

            string dinos = await LoadDinosFromStore();
            List<LostDino> lostDinos = ConvertDinosJson(dinos);
            return lostDinos;
        }


        public async Task<IEnumerable<LostDino>> SearchMissingDinosaursList(string searchparam)
        {
            IEnumerable<LostDino> lostDinos = await GetMissingDinosaursList();
            
            List<LostDino> searchedDinos = new List<LostDino>();
            searchedDinos.AddRange(lostDinos.Where(x => !string.IsNullOrWhiteSpace(x.Class) &&  x.Class.ToLowerInvariant().Contains(searchparam.ToLowerInvariant())));
            searchedDinos.AddRange(lostDinos.Where(x => !string.IsNullOrWhiteSpace(x.Name) && x.Name.ToLowerInvariant().Contains(searchparam.ToLowerInvariant())));
            searchedDinos.AddRange(lostDinos.Where(x => !string.IsNullOrWhiteSpace(x.TribeName) &&  x.TribeName.ToLowerInvariant().Contains(searchparam.ToLowerInvariant())));
            searchedDinos.AddRange(lostDinos.Where(x => !string.IsNullOrWhiteSpace(x.Sheet) && x.Sheet.ToLowerInvariant().Contains(searchparam.ToLowerInvariant())));
            //searchedDinos.AddRange(lostDinos.Where(x => x.Sheet.Contains(searchparam)));

            return searchedDinos.AsEnumerable();
        }

        private async Task<string> LoadDinosFromStore()
        {
            string dinos = string.Empty;

            if (!_cache.TryGetValue("ListOfMissingDinos", out dinos))
            {
                Console.WriteLine("Cache miss....loading from database into cache");
                DropboxDataAgent dropboxDataAgent = new DropboxDataAgent();
                dinos = await dropboxDataAgent.DownloadDinosaursFile();

                //the excel file is exported all days at 5:01 UK time, since i dont know if time as DST applied i change cache at 7:30 GMT
                // will have to check with Server Admin to match updates in the future
                int offset = DateTime.UtcNow.Hour >= 7 ? 1 : 0;
                DateTimeOffset cacheOffset = new DateTimeOffset(DateTime.UtcNow.Date.AddDays(offset).AddHours(7).AddMinutes(30));

                _cache.Set("ListOfMissingDinos", dinos, cacheOffset);
            }
            else
            {
                Console.WriteLine("Cache hit");
            }

            return dinos;
        }

        private List<LostDino> ConvertDinosJson(string dinos)
        {
            return JsonConvert.DeserializeObject<List<LostDino>>(dinos);
        }


    }
}
