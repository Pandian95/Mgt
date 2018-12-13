using ProjectManager.DAL.GenericRepository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProjectManager.DAL.UnitOfWork
{
    public interface IUnitOfWork
    {
        GenericRepository<Project> ProjectRepository
        {
            get;
        }
        GenericRepository<User> UserRepository
        {
            get;
        }
        GenericRepository<Task> TaskRepository
        {
            get;
        }
        GenericRepository<vw_ProjectSearch> ProjectSearchRepository
        {
            get;
        }
        GenericRepository<ParentTask> ParentTaskRepository
        {
            get;
        }
        void Save();
    }
}
