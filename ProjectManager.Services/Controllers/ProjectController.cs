using ProjectManager.BL;
using ProjectManager.BusinessEntities;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectManager.Services.Controllers
{
    public class ProjectController : ApiController
    {
        private readonly IProjectServices _projectServices;

        #region Public Constructor  

        /// <summary>  
        /// Public constructor to initialize project service instance  
        /// </summary>  
        public ProjectController()
        {
            _projectServices = new ProjectServices();
        }

        #endregion

        // GET: api/Project
        public HttpResponseMessage Get()
        {
            var projects = _projectServices.GetAllProjects();
            if (projects != null)
            {
                var projectEntities = projects as List<ProjectEntity> ?? projects.ToList();
                if (projectEntities.Any())
                    return Request.CreateResponse(HttpStatusCode.OK, projectEntities);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Products not found");
        }

        // GET: api/Project/5
        public HttpResponseMessage Get(int id)
        {
            var project = _projectServices.GetProjectById(id);
            if (project != null)
                return Request.CreateResponse(HttpStatusCode.OK, project);
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No project found for this id");
        }

        // POST api/project  
        public int Post([FromBody] ProjectEntity projectEntity)
        {
            return _projectServices.CreateProject(projectEntity);
        }

        // PUT api/project/5  
        public bool Put(int id, [FromBody]ProjectEntity projectEntity)
        {
            if (id > 0)
            {
                return _projectServices.UpdateProject(id, projectEntity);
            }
            return false;
        }

        // DELETE api/project/5  
        public bool Delete(int id)
        {
            if (id > 0)
                return _projectServices.DeleteProject(id);
            return false;
        }
    }
}
