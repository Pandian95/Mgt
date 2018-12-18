using ProjectManager.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Task = ProjectManager.DAL.Task;

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
                    Project1="Project updated",
                    Priority = "3",
                    Start_Date = Convert.ToDateTime("2018-01-17"),
                    End_Date = Convert.ToDateTime("2018-01-22")
                },
                 new Project()
                {
                    Project_ID = 1003,
                    Project1 = "AFMS1",
                Priority = "2",
                Start_Date = Convert.ToDateTime("2018-01-17"),
                End_Date = Convert.ToDateTime("2018-01-22")
                }
            };
            return projects;
        }

        public static List<User> GetAllUsers()
        {
            var users = new List<User>
                {
                new User()
                {
                    User_ID = 1,
                    First_Name="Rajkumar",
                    Last_Name = "VM",
                    Employee_ID = 725129,
                    Project_ID = 4,
                    Task_ID = null
                },
                 new User()
                {
                    User_ID = 2,
                    First_Name="Abhijith",
                    Last_Name = "S",
                    Employee_ID = 789345,
                    Project_ID = 4,
                    Task_ID = null
                },
                 new User()
                {
                    User_ID = 3,
                    First_Name="Jagannath",
                    Last_Name = "VM",
                    Employee_ID = 45465,
                    Project_ID = null,
                    Task_ID = null
                },
                 new User()
                {
                    User_ID = 4,
                    First_Name="Pavitha",
                    Last_Name = "V",
                    Employee_ID = 465456,
                    Project_ID = null,
                    Task_ID = null
                },
                 new User()
                {
                    User_ID = 5,
                    First_Name="Rithvik",
                    Last_Name = "R",
                    Employee_ID = 34324,
                    Project_ID = null,
                    Task_ID = 1
                }
            };
            return users;
        }

        public static List<Task> GetAllTasks()
        {
            var tasks = new List<Task>
                {
                new Task()
                {
                    Task_ID =1,
                    Parent_ID = 2,
                    Project_ID = 2,
                    Task1 = "DAL Layer -1",
                    Start_Date = Convert.ToDateTime("2018-12-28"),
                    End_Date = Convert.ToDateTime("2018-12-31"),
                    Priority = "19",
                    Status = null
                }
            };
            return tasks;
        }

        public static List<ParentTask> GetAllParentTasks()
        {
            var tasks = new List<ParentTask>
                {
                new ParentTask()
                {
                    Parent_ID = 2,
                    Parent_Task = "Web API Development"
                }
            };
            return tasks;
        }
    }
}
