using ProjectManager.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TestHelper
{
    public class DataInitializer
    {
        ///<summary>  
        /// Dummy products  
        ///</summary>  
        ///<returns></returns>  
        public static List<Project> GetAllProjects()
        {
            var projects = new List<Project>
                {
                new Project()
                {
                    Project_ID = 2,
                    Project1="AFMS",
                    Priority = "3",
                    Start_Date = Convert.ToDateTime("2018-01-17"),
                    End_Date = Convert.ToDateTime("2018-01-22")
                }
            };
            return projects;
        }
    }
}
