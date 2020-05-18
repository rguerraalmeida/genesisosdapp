using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace ark_utilities_web.api.Model
{
    public class Dino
    {
            public string Class { get; set; }
            public string Name { get; set; }
            public string TribeName { get; set; }
            public string TamerString { get; set; }
            public string Gender { get; set; }
            public double Level { get; set; }
            public double Y { get; set; }
            public double X { get; set; }
            public string Status { get; set; }
            public string Timestamp { get; set; }
            public string Sheet { get; set; }
            public bool Outdated { get { return DateTime.UtcNow.Subtract(DateTime.ParseExact(Timestamp, "dd.MM.yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None)) > new TimeSpan(30, 0, 0); } }
    }
}
