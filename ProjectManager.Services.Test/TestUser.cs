using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManager.Services.Test
{    
    public partial class TestUser
    {
        [JsonIgnore]
        public int User_ID { get; set; }
        [JsonIgnore]
        public string First_Name { get; set; }
        public string Last_Name { get; set; }
        [JsonIgnore]
        public Nullable<int> Employee_ID { get; set; }
        [JsonIgnore]
        public Nullable<int> Project_ID { get; set; }
        [JsonIgnore]
        public Nullable<int> Task_ID { get; set; }
    }
}
