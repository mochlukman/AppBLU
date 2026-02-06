using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using BLUDBE.Interface;

namespace BLUDBE.Repository
{
    public class Repo<T> : IRepo<T> where T : class
    {
        protected readonly DbContext _context;
        public Repo(DbContext context)
        {
            _context = context;
        }
        public async Task<T> Add(T entity)
        {
            _context.Set<T>().Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public void AddRange(List<T> entities)
        {
            _context.Set<T>().AddRange(entities);
        }

        public async Task<long> Count(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().Where(expression).CountAsync();
        }

        public async Task<T> Get(long Id)
        {
            return await _context.Set<T>().FindAsync(Id);
        }

        public async Task<T> Get(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(expression);
        }

        public async Task<List<T>> Gets()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<List<T>> Gets(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().Where(expression).ToListAsync();
        }

        public async Task<bool> isExist(Expression<Func<T, bool>> expression)
        {
            return await _context.Set<T>().AnyAsync(expression);
        }

        public void Remove(T entity)
        {
            _context.Set<T>().Remove(entity);
        }

        public void RemoveRange(List<T> entities)
        {
            _context.Set<T>().RemoveRange(entities);
        }
    }
}
