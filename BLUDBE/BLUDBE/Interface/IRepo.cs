using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace BLUDBE.Interface
{
    public interface IRepo<T> where T : class
    {
        Task<T> Get(long Id);
        Task<T> Get(Expression<Func<T, bool>> expression);
        Task<List<T>> Gets();
        Task<List<T>> Gets(Expression<Func<T, bool>> expression);
        Task<bool> isExist(Expression<Func<T, bool>> expression);
        Task<T> Add(T entity);
        void AddRange(List<T> entities);
        void Remove(T entity);
        void RemoveRange(List<T> entities);
        Task<long> Count(Expression<Func<T, bool>> expression);
    }
}
