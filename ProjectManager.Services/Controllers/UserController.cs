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
        [HttpPost]
        public HttpResponseMessage AddUserDetails([FromBody]User objUser)
        {
            UserComponent objuser = new UserComponent();
            objuser.AddUser(objUser);
            var response = new HttpResponseMessage();
            response.Headers.Add("Message", "Succsessfuly Inserted!!!");
            return response;

        }

        [HttpDelete]
        public HttpResponseMessage Delete(int userID)
        {
            var response = new HttpResponseMessage();

            if (userID <= 0)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            UserComponent objuser = new UserComponent();
            objuser.DeleteUser(userID);            
            response.Headers.Add("Message", "Succsessfuly Updated!!!");
            return response;
        }

        [HttpPut]
        public HttpResponseMessage UpdateUserDetails([FromBody] User objUser)
        {
            UserComponent objuser = new UserComponent();
            objuser.UpdateUser(objUser);
            var response = new HttpResponseMessage();
            response.Headers.Add("Message", "Succsessfuly Updated!!!");
            return response;

        }
        
        [HttpGet]
        public HttpResponseMessage Get()
        {
            UserComponent objuser = new UserComponent();
            List<User> lstUser = objuser.GetUsers();
            if (lstUser == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, Json(lstUser));
        }

        [Route("getuser/{iUserID:int}")]
        [HttpGet]
        public HttpResponseMessage GetUser(int iUserID)
        {
            UserComponent objuser = new UserComponent();
            User objUser = objuser.GetUsersByID(iUserID);
            if (objUser == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }
            return Request.CreateResponse(HttpStatusCode.OK, objUser);
        }
        
    }
}
