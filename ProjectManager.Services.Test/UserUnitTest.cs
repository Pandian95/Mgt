using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using ProjectManager.DAL;
using ProjectManager.Services.Controllers;

namespace ProjectManager.Services.Test
{
    [TestClass]
    public class UserUnitTest
    {
        [TestMethod]
        public void GetUserByIDTest()
        {
            // Set up Prerequisites   
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            // Act on Test  
            var response = controller.GetUser(1);
            // Assert the result  
            User user;
            Assert.IsTrue(response.TryGetContentValue<User>(out user));
            Assert.AreEqual("Rajkumar", user.First_Name);
        }

        [TestMethod]
        public void GetUsersTest()
        {
            // Set up Prerequisites   
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            // Act on Test  
            var response = controller.Get();
            // Assert the result  
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [TestMethod]
        public void DeleteUserTest()
        {
            // Set up Prerequisites   
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            // Act on Test  
            var response = controller.Delete(1);
            // Assert the result  
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [TestMethod]
        public void AddUserTest()
        {
            // Set up Prerequisites   
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            // Act on Test  
            User user = new User();
            user.First_Name = "Rithvik";
            user.Last_Name = "R";
            user.Employee_ID = 5;
            var response = controller.AddUserDetails(user);
            // Assert the result  
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }

        [TestMethod]
        public void UpdateUserTest()
        {
            // Set up Prerequisites   
            var controller = new UserController();
            controller.Request = new HttpRequestMessage();
            controller.Configuration = new HttpConfiguration();
            // Act on Test  
            User user = new User();
            user.User_ID = 6;
            user.First_Name = "Rithu";
            user.Last_Name = "R";
            user.Employee_ID = 5;
            var response = controller.UpdateUserDetails(user);
            // Assert the result  
            Assert.AreEqual(response.StatusCode, HttpStatusCode.OK);
        }
    }
}
