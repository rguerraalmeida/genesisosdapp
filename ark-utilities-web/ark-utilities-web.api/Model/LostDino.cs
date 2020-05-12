using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ark_utilities_web.api.Model
{
    public class LostDino
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
    }
}
