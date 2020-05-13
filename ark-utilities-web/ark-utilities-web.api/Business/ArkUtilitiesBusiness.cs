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

        private List<Dino> ConvertDinosJson(string dinos)
        {
            return JsonConvert.DeserializeObject<List<Dino>>(dinos);
        }


    }
}
