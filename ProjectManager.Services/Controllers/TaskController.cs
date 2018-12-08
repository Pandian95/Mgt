using ProjectManager.BL;
using ProjectManager.BusinessEntities;
using ProjectManager.Logger;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectManager.Services.Controllers
{
    public class TaskController : ApiController
    {
        private readonly ITaskServices _taskServices;
        private readonly ILogger _loggerServices;

        #region Public Constructor  

        /// <summary>  
        /// Public constructor to initialize user service instance  
        /// </summary>  
        public TaskController()
        {
            _taskServices = new TaskServices();
            _loggerServices = new LoggerException();
        }

        #endregion
        // GET: api/Task
        public HttpResponseMessage Get()
        {
            try {
                _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : TaskController | Method Name : GetAllTasks | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);

                var tasks = _taskServices.GetAllTasks();
                if (tasks != null)
                {
                    var taskEntities = tasks as List<TaskEntity> ?? tasks.ToList();
                    if (taskEntities.Any())
                        return Request.CreateResponse(HttpStatusCode.OK, taskEntities);
                }
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Tasks not found");
        }

        // GET: api/Task/5
        public HttpResponseMessage Get(int id)
        {
            try {
                _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : TaskController | Method Name : GetTaskById | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);

                var task = _taskServices.GetTaskById(id);
                if (task != null)
                    return Request.CreateResponse(HttpStatusCode.OK, task);
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No user found for this id");
        }

        // POST: api/Task
        public int Post([FromBody]TaskEntity taskEntity)
        {
            try {
                _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : TaskController | Method Name : CreateTask | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);

                return _taskServices.CreateTask(taskEntity);
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return 0;
        }

        // PUT: api/Task/5
        public bool Put(int id, [FromBody]TaskEntity taskEntity)
        {
            try {
                if (id > 0)
                {
                    _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : TaskController | Method Name : UpdateTask | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);
                    return _taskServices.UpdateTask(id, taskEntity);
                }
            }
            catch (Exception exception)
            {
                _loggerServices.LogException(exception, LoggerConstants.Informations.WebAPIInfo);
            }
            return false;
        }

        // DELETE: api/Task/5
        public bool Delete(int id)
        {
            try
            {
                if (id > 0)
                {
                    _loggerServices.LogInfo("InfoCode: API Info | Message :" + "File Name : TaskController | Method Name : DeleteTask | Description : Method Begin", LoggerConstants.Informations.WebAPIInfo);
                    return _taskServices.DeleteTask(id);
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
