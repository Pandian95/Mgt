using Moq;
using NUnit.Framework;
using ProjectManager.BL;
using ProjectManager.DAL;
using ProjectManager.DAL.GenericRepository;
using ProjectManager.DAL.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using TestHelper;



namespace Tests
{
    public class Tests
    {
        #region Variables  
        private IProjectServices _projectService;
        private IUnitOfWork _unitOfWork;
        private List<Project> _projects;
        private GenericRepository<Project> _projectRepository;
        private ProjectManagerEntities _dbEntities;
        #endregion

        #region Setup  
        ///<summary>  
        /// Re-initializes test.  
        ///</summary>  
        [SetUp]
        public void ReInitializeTest()
        {
            _dbEntities = new Mock<ProjectManagerEntities>().Object;
            _projectRepository = SetUpProjectRepository();
            var unitOfWork = new Mock<IUnitOfWork>();
            unitOfWork.SetupGet(s => s.ProjectRepository).Returns(_projectRepository);
            _unitOfWork = unitOfWork.Object;
            _projectService = new ProjectServices();
        }

        #endregion

        private GenericRepository<Project> SetUpProjectRepository()
        {

            // Initialise repository  
            var mockRepo = new Mock<GenericRepository<Project>>(MockBehavior.Default, _dbEntities);

            // Setup mocking behavior  
            mockRepo.Setup(p => p.GetAll()).Returns(_projects);

            mockRepo.Setup(p => p.GetByID(It.IsAny<int>()))
                .Returns(new Func<int, Project>(
                    id => _projects.Find(p => p.Project_ID.Equals(id))));


            mockRepo.Setup(p => p.Insert((It.IsAny<Project>())))
                .Callback(new Action<Project>(newProject =>
                {
                    //dynamic maxProject_ID = _projects.Last().Project_ID;
                    //dynamic nextProject_ID = maxProject_ID + 1;
                    //newProject.Project_ID = nextProject_ID;
                    _projects.Add(newProject);
                }));


            mockRepo.Setup(p => p.Update(It.IsAny<Project>()))
                .Callback(new Action<Project>(proj =>
                {
                    var oldProject = _projects.Find(a => a.Project_ID == proj.Project_ID);
                    oldProject = proj;
                }));

            mockRepo.Setup(p => p.Delete(It.IsAny<Project>()))
                .Callback(new Action<Project>(proj =>
                {
                    var projectToRemove =
                        _projects.Find(a => a.Project_ID == proj.Project_ID);

                    if (projectToRemove != null)
                        _projects.Remove(projectToRemove);
                }));

            // Return mock implementation object  
            return mockRepo.Object;
        }
        [TearDown]
        public void DisposeTest()
        {
            _projectService = null;
            _unitOfWork = null;
            _projectRepository = null;
            if (_dbEntities != null)
                _dbEntities.Dispose();
        }

        [OneTimeSetUp]
        public void Setup()
        {
            _projects = SetUpProjects();
        }

        private static List<Project> SetUpProjects()
        {
            var projId = new int();
            var projects = DataInitializer.GetAllProjects();
            foreach (Project prod in projects)
                prod.Project_ID = ++projId;
            return projects;

        }
        [OneTimeTearDown]
        public void DisposeAllObjects()
        {
            _projects = null;
        }

        [Test]
        public void GetAllProjectsTest()
        {
            var projects = _projectService.GetAllProjects();
            var projectList =
                projects.Select(
                    projectEntity =>
                    new Project
                    {
                        Project_ID = projectEntity.Project_ID,
                        Project1 = projectEntity.Project1,
                        Priority = projectEntity.Priority,
                        Start_Date = projectEntity.Start_Date,
                        End_Date = projectEntity.End_Date
                    }).ToList();
            var comparer = new ProjectComparer();
            CollectionAssert.AreEqual(
                projectList.OrderBy(project => project, comparer),
                _projects.OrderBy(project => project, comparer), comparer);
        }
    }
}