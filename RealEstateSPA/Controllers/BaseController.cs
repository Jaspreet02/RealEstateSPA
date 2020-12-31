using DBHandler;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RealEstate
{
    [ApiController]
    [Route("api/[controller]")]
    public abstract class BaseController<TEntity, TRepository> : ControllerBase
        where TEntity : class where TRepository : IRepository<TEntity>
    {
        private readonly TRepository _repository;

        public BaseController(TRepository repository)
        {
            _repository = repository;
        }

        //int pageNumber = 0, int pageSize = 10,string sortField = "CreatedAt", string sortOrder = "desc", bool fetchAll = false
        // GET: api/[controller]
        [HttpGet("{pageNumber:int}/{pageSize:int}/{sortField}/{sortOrder}")]
       // [DisableCors]
        public IPageResult<TEntity> Get( int pageNumber, int pageSize,string sortField, string sortOrder)
        {
            return CreatePageResult<TEntity>(_repository.GetAll().OrderBy(sortField + " " + sortOrder), pageNumber,pageSize,true);
        }

        // GET: api/[controller]/5
        [HttpGet("{id}")]
        public ActionResult<TEntity> Get(int id)
        {
            var entity  = _repository.Get(id);
            if (entity == null)
            {
                return NotFound();
            }
            return entity;
        }

        // PUT: api/[controller]/5
        [HttpPut("{id}")]
        public IActionResult Put(string id, TEntity entity)
        {
            if (string.IsNullOrEmpty(id))
            {
                return BadRequest();
            }
            _repository.Update(entity);
            return NoContent();
        }

        // POST: api/[controller]
        [HttpPost]
        public ActionResult<TEntity> Post(TEntity entity)
        {
            _repository.Add(entity);
            return CreatedAtAction("Get", new { id = 12 }, entity);
        }

        // DELETE: api/[controller]/5
        [HttpDelete("{id}")]
        public ActionResult<TEntity> Delete(int id)
        {
            var movie =  _repository.Delete(id);
            if (movie == null)
            {
                return NotFound();
            }
            return movie;
        }

        protected IPageResult<T> CreatePageResult<T>(IQueryable<T> items, int pageNumber, int pageSize,bool fetchAll)
        {
            pageNumber = fetchAll ? 0 : pageNumber;
            var count = items.Count();
            pageSize = fetchAll ? count : pageSize;
            var result = items.Skip(--pageNumber * pageSize).Take(pageSize);
            return new PageResult<T>()
            {
                result = result,
                count = count
            };
        }
    }
}
