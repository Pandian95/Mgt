using ProjectManager.BL;
using ProjectManager.BusinessEntities;
using ProjectManager.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectManager.WebAPI.Controllers
{
    public class ProjectController : ApiController
    {
        private readonly IProjectServices _projectServices;
        private readonly ILogger _loggerServices;

        #region Public Constructor  

        /// <summary>  
        /// Public constructor to initialize project service instance  
        /// </summary>  
        public ProjectController()
        {
            _projectServices = new ProjectServices();
            _loggerServices = new LoggerException();
        }

        #endregion

        // GET: api/Project
        public HttpResponseMessage Get()
        {
            try
            {
                _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : ProjectController | Method Name : Get | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);
                var projects = _projectServices.GetAllProjects();
                if (projects != null)
                {
                    var projectEntities = projects as List<ProjectEntity> ?? projects.ToList();
                    if (projectEntities.Any())
                        return Request.CreateResponse(HttpStatusCode.OK, projectEntities);
                }
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Projects not found");
        }

        // GET: api/Project/5
        public HttpResponseMessage Get(int id)
        {
            try
            {
                _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : ProjectController | Method Name : GetProjectById | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);
                var project = _projectServices.GetProjectById(id);
                if (project != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, project);
                }
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No project found for this id");
        }

        // POST api/project  
        public int Post(ProjectEntity projectEntity)
        {
            try
            {
                _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : ProjectController | Method Name : CreateProject | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);
                return _projectServices.CreateProject(projectEntity);
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return 0;

        }

        // PUT api/project/5  
        public bool Put(int id, ProjectEntity projectEntity)
        {
            try
            {
                if (id > 0)
                {
                    _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : ProjectController | Method Name : UpdateProject | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);
                    return _projectServices.UpdateProject(id, projectEntity);
                }
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return false;
        }

        // DELETE api/project/5  
        public bool Delete(int id)
        {
            try
            {
                if (id > 0)
                {
                    _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : ProjectController | Method Name : DeleteProject | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);
                    return _projectServices.DeleteProject(id);
                }
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return false;
        }
    }
}
