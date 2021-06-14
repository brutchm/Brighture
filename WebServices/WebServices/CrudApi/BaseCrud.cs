using Entities;
using System.Collections.Generic;

namespace CrudApi
{
    public abstract class BaseCrud
    {
        public abstract void CreateAsync(BaseEntity entity);
        public abstract void Delete(BaseEntity entity);
        public abstract List<T> Retrieve<T>();
        public abstract List<T> RetrieveAllById<T>(BaseEntity entity);
        public abstract T RetrieveById<T>(BaseEntity entity);
        public abstract void Update(BaseEntity entity);
    
    }
}
