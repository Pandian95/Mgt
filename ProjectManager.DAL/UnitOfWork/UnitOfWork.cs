﻿#region Using Namespaces...  

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Data.Entity.Validation;
using ProjectManager.DAL.GenericRepository;

#endregion

namespace ProjectManager.DAL.UnitOfWork
{
    /// <summary>  
    /// Unit of Work class responsible for DB transactions  
    /// </summary>  
    public class UnitOfWork : IDisposable, IUnitOfWork
    {
        #region Private member variables...  

        private ProjectManagerEntities _context = null;
        private GenericRepository<User> _userRepository;
        private GenericRepository<Project> _projectRepository;
        private GenericRepository<Task> _taskRepository;
        #endregion

        public UnitOfWork()
        {
            _context = new ProjectManagerEntities();
        }

        #region Public Repository Creation properties...  

        /// <summary>  
        /// Get/Set Property for product repository.  
        /// </summary>  
        public GenericRepository<Project> ProjectRepository
        {
            get
            {
                if (this._projectRepository == null)
                    this._projectRepository = new GenericRepository<Project>(_context);
                return _projectRepository;
            }
        }

        /// <summary>  
        /// Get/Set Property for user repository.  
        /// </summary>  
        public GenericRepository<User> UserRepository
        {
            get
            {
                if (this._userRepository == null)
                    this._userRepository = new GenericRepository<User>(_context);
                return _userRepository;
            }
        }

        /// <summary>  
        /// Get/Set Property for token repository.  
        /// </summary>  
        public GenericRepository<Task> TaskRepository
        {
            get
            {
                if (this._taskRepository == null)
                    this._taskRepository = new GenericRepository<Task>(_context);
                return _taskRepository;
            }
        }
        #endregion

        #region Public member methods...  
        /// <summary>  
        /// Save method.  
        /// </summary>  
        public void Save()
        {
            try
            {
                _context.SaveChanges();
            }
            catch (DbEntityValidationException e)
            {

                var outputLines = new List<string>();
                foreach (var eve in e.EntityValidationErrors)
                {
                    outputLines.Add(string.Format("{0}: Entity of type \"{1}\" in state \"{2}\" has the following validation errors:", DateTime.Now, eve.Entry.Entity.GetType().Name, eve.Entry.State));
                    foreach (var ve in eve.ValidationErrors)
                    {
                        outputLines.Add(string.Format("- Property: \"{0}\", Error: \"{1}\"", ve.PropertyName, ve.ErrorMessage));
                    }
                }
                System.IO.File.AppendAllLines(@"C:\errors.txt", outputLines);

                throw e;
            }

        }

        #endregion

        #region Implementing IDiosposable...  

        #region private dispose variable declaration...  
        private bool disposed = false;
        #endregion

        /// <summary>  
        /// Protected Virtual Dispose method  
        /// </summary>  
        /// <param name="disposing"></param>  
        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    Debug.WriteLine("UnitOfWork is being disposed");
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        /// <summary>  
        /// Dispose method  
        /// </summary>  
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
        #endregion
    }
}