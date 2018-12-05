using ProjectManager.BL;
using ProjectManager.BusinessEntities;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectManager.Services.Controllers
{
    public class UserController : ApiController
    {
        private readonly IUserServices _userServices;

        #region Public Constructor  

        /// <summary>  
        /// Public constructor to initialize user service instance  
        /// </summary>  
        public UserController()
        {
            _userServices = new UserServices();
        }

        #endregion

        // GET: api/User
        public HttpResponseMessage Get()
        {
            var users = _userServices.GetAllUsers();
            if (users != null)
            {
                var userEntities = users as List<UserEntity> ?? users.ToList();
                if (userEntities.Any())
                    return Request.CreateResponse(HttpStatusCode.OK, userEntities);
            }
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Users not found");
        }

        // GET: api/User/5
        public HttpResponseMessage Get(int id)
        {
            var user = _userServices.GetUserById(id);
            if (user != null)
                return Request.CreateResponse(HttpStatusCode.OK, user);
            return Request.CreateErrorResponse(HttpStatusCode.NotFound, "No user found for this id");
        }

        // POST: api/User
        public int Post([FromBody]UserEntity userEntity)
        {
            return _userServices.CreateUsers(userEntity);
        }

        // PUT: api/User/5
        public bool Put(int id, [FromBody]UserEntity userEntity)
        {
            if (id > 0)
            {
                return _userServices.UpdateUser(id, userEntity);
            }
            return false;
        }

        // DELETE: api/User/5
        public bool Delete(int id)
        {
            if (id > 0)
                return _userServices.DeleteUser(id);
            return false;
        }
    }
}
