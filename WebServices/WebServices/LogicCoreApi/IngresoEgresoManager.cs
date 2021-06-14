using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using CrudApi;
using Entities;

namespace LogicCoreApi
{
    public class IngresoEgresoManager
    {
        private IngresoEgresoCrud crud;

        public IngresoEgresoManager()
        {
            this.crud = new IngresoEgresoCrud();
        }

        public List<Ingreso_Egreso> RetriveAll()
        {

            try
            {
                List<Ingreso_Egreso> list = crud.Retrieve<Ingreso_Egreso>();
                if(list != null){
                    return list;
                }
                else
                {
                    throw new Exception();
                }
               
            }
            catch(Exception ex)
            {
                throw ex;
            }

     
        }

        public Ingreso_Egreso RetriveById(BaseEntity entity)
        {
            Ingreso_Egreso item = crud.RetrieveById<Ingreso_Egreso>(entity);
            if (item != null)
            {
                return item;
            }
            else
            {
                throw new Exception();
            }
           
        }

        public void Create(BaseEntity item)
        {
            try
            {
                crud.CreateAsync(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }

        public void Update(BaseEntity item)
        {
            try
            {
                crud.Update(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
           
        }

        public void Delete(BaseEntity item)
        {
            try
            {
                crud.Delete(item);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            
        }

        public List<Ingreso_Egreso> RetriveAllById(BaseEntity usuario)
        {
            try
            {

                List<Ingreso_Egreso> lista = crud.RetrieveAllById<Ingreso_Egreso>(usuario);

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

        public List<TransaccionGrafico> RetriveAllGrafico(BaseEntity transaccion)
        {


            try
            {
                Ingreso_Egreso tran = (Ingreso_Egreso) transaccion;
                Usuario usr = new Usuario
                {
                    Id = tran.Usuario
                };

                List<Ingreso_Egreso> lista = crud.RetrieveAllById<Ingreso_Egreso>(usr);

                if (lista != null)
                {
                    List<TransaccionGrafico> listaGrafico = new List<TransaccionGrafico>();
                    Dictionary<string, TransaccionGrafico > dictionary =  new Dictionary<string, TransaccionGrafico>();


                    DateTime fechaUsr = DateTime.ParseExact(tran.Fecha, "dd-MM-yyyy", CultureInfo.InvariantCulture);

                   

                    foreach(Ingreso_Egreso info in lista){
                        string dtString = info.Fecha;
                        dtString = dtString.Replace("(GMT Standard Time)", "").Trim();
                        dtString = dtString.Replace("GMT-0600 (hora estándar central)", "").Trim();
                        dtString = dtString.Replace("GMT-0600 (Central Standard Time)", "").Trim();
                        DateTime fechaTransaccion;
                        bool validFormat = DateTime.TryParseExact(dtString, "ddd MMM dd yyyy HH:mm:ss", CultureInfo.InvariantCulture, DateTimeStyles.None, out fechaTransaccion);

                        if (validFormat && info.Tipo.Equals("Egreso"))
                        {
                            if (fechaTransaccion.Month == fechaUsr.Month && 
                                fechaTransaccion.Year == fechaUsr.Year)
                            {
                                TransaccionGrafico tranGraf = new TransaccionGrafico
                                {
                                    Categoria = info.Categoria,
                                    Valor = Convert.ToDouble(info.Valor)
                                };

                              
                                

                                TransaccionGrafico val;
                                if (dictionary.TryGetValue(tranGraf.Categoria, out val))
                                {
                                    // yay, value exists!
                                    dictionary[tranGraf.Categoria].Valor = val.Valor + tranGraf.Valor;
                                }
                                else
                                {
                                    // darn, lets add the value
                                    dictionary.Add(tranGraf.Categoria, tranGraf);
                                }

                                    

                            }
                        }
                    }


                    listaGrafico = dictionary.Values.ToList();

                    if(listaGrafico.Count != 0)
                    {
                        return listaGrafico;
                    }
                    else
                    {
                        throw new Exception();
                    }

                   
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


    }
}
