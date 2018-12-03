using ProjectManager.DAL;
using ProjectManager.DAL.Component;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ProjectManager.Services.Controllers
{
    [RoutePrefix("api/users")]
    public class UserController : ApiController
    {
        [Route("addusers")]
        [HttpPost]
        public HttpResponseMessage AddUserDetails([FromBody]User objUser)
        {
            UserComponent objuser = new UserComponent();
            objuser.AddUser(objUser);
            var response = new HttpResponseMessage();
            response.Headers.Add("Message", "Succsessfuly Inserted!!!");
            return response;

        }
        [Route("deleteuser/{userID:int}")]
        [HttpDelete]
        public HttpResponseMessage DeleteUserDetails(int userID)
        {
            UserComponent objuser = new UserComponent();
            objuser.DeleteUser(userID);

            var response = new HttpResponseMessage();
            response.Headers.Add("Message", "Succsessfuly Deleted!!!");
            return response;

        }
        [Route("updateuser")]
        [HttpPut]
        public HttpResponseMessage UpdateUserDetails([FromBody] User objUser)
        {
            UserComponent objuser = new UserComponent();
            objuser.UpdateUser(objUser);
            var response = new HttpResponseMessage();
            response.Headers.Add("Message", "Succsessfuly Updated!!!");
            return response;

        }
        [Route("get")]
        [HttpGet]
        public IHttpActionResult Get()
        {
            UserComponent objuser = new UserComponent();
            List<User> lstUser = objuser.GetUsers();
            return Json(lstUser);
        }
        [Route("getuser/{iUserID:int}")]
        [HttpGet]
        public IHttpActionResult GetUser(int iUserID)
        {
            UserComponent objuser = new UserComponent();
            User objUser = objuser.GetUsersByID(iUserID);
            return Json(objUser);

        }
        
    }
}
