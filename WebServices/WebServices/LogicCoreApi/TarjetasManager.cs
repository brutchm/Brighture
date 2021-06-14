using CrudApi;
using Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace LogicCoreApi
{
    public class TarjetasManager : CoreManager
    {
        public TarjetaCrud tarjetaCrud;

        public TarjetasManager()
        {
            this.tarjetaCrud = new TarjetaCrud();
        }

        public  void Create(BaseEntity entity)
        {
            try
            {
                tarjetaCrud.CreateAsync(entity);
            }
            catch (Exception err)
            {
                throw err;
            }
         


        }

        public  void Delete(BaseEntity entity)
        {
            try
            {
                tarjetaCrud.Delete(entity);
            }
            catch (Exception err)
            {
                throw err;
            }
           
        }

        public  List<Tarjeta> Retrieve()
        {

            try
            {
                List<Tarjeta> lista = tarjetaCrud.Retrieve<Tarjeta>();

                if (lista != null)
                {
                    return lista;
                }
                else
                {
                    throw new Exception();
                }
              

            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }

        public  List<Tarjeta> RetrieveAllById(BaseEntity entity)
        {
            try
            {
                List<Tarjeta> lista = tarjetaCrud.RetrieveAllById<Tarjeta>(entity);
                if(lista != null)
                {
                    return lista;
                }
                else
                {
                    throw new Exception();
                }
               

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public Tarjeta RetrieveById(BaseEntity entity)
        {
            try
            {
               Tarjeta tarje = tarjetaCrud.RetrieveById<Tarjeta>(entity);
                if (tarje != null)
                {
                    return tarje;
                }
                else
                {
                    throw new Exception();
                }

   
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public  void Update(BaseEntity entity)
        {
            try
            {
                tarjetaCrud.Update(entity);
            }
            catch (Exception err)
            {
                throw err;
            }
          
        }
    }
}
