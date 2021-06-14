using Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;

namespace CrudApi
{
    public class TarjetaCrud : BaseCrud
    {
        private string baseUrl = "https://brighturedataaccess.azurewebsites.net/api/";                                    
        //private string baseUrl = "https://localhost:5001/api/";

        public TarjetaCrud()
        {

        }
        public override void CreateAsync(BaseEntity entity)
        {
            try
            {
                Tarjeta tarjeta = (Tarjeta)entity;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpContent content = new StringContent(JsonConvert.SerializeObject(tarjeta), Encoding.UTF8, "application/json");
                    HttpResponseMessage respuesta = client.PostAsync("Tarjeta", content).Result;

                    if (respuesta.IsSuccessStatusCode)
                    {


                    }
                    else
                    {

                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override void Delete(BaseEntity entity)
        {
            try
            {

                using (var client = new HttpClient())
                {

                    Tarjeta tarj = (Tarjeta)entity;
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage respuesta = client.DeleteAsync("Tarjeta/" + tarj.id).Result;

                    if (respuesta.IsSuccessStatusCode)
                    {


                    }
                    else
                    {


                    }


                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override List<T> Retrieve<T>()
        {
            try
            {
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage respuesta = client.GetAsync("Tarjeta").Result;

                    if (respuesta.IsSuccessStatusCode)
                    {
                        var resp = respuesta.Content.ReadAsStringAsync().Result;
                        if (resp != null)
                        {
                            List<T> listaTarjetas = new List<T>();
                            var tarjetas = JsonConvert.DeserializeObject<List<Tarjeta>>(resp.ToString());
                            foreach (var ta in tarjetas)
                            {
                                listaTarjetas.Add((T)Convert.ChangeType(ta, typeof(T)));
                            }


                            return listaTarjetas;
                        }

                    }
                    else
                    {
                        var rExp = new Exception();

                        throw rExp;

                    }
                    return null;

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }


        }

        public override List<T> RetrieveAllById<T>(BaseEntity entity)
        {
            try
            {
                Tarjeta tarjeta = (Tarjeta)entity;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage respuesta = client.GetAsync("Tarjeta/TarjetaByUserId/" + tarjeta.IdUsuario).Result;

                    if (respuesta.IsSuccessStatusCode)
                    {
                        var resp = respuesta.Content.ReadAsStringAsync().Result;
                        if (resp != null)
                        {
                            List<T> listaTarjetas = new List<T>();
                            var tarjetas = JsonConvert.DeserializeObject<List<Tarjeta>>(resp.ToString());
                            foreach (var ta in tarjetas)
                            {
                                listaTarjetas.Add((T)Convert.ChangeType(ta, typeof(T)));
                            }


                            return listaTarjetas;
                        }

                    }
                    else
                    {
                        var rExp = new Exception();

                        throw rExp;

                    }
                    return null;

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override T RetrieveById<T>(BaseEntity entity)
        {
            try
            {
                Tarjeta tarjeta = (Tarjeta)entity;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpResponseMessage respuesta = client.GetAsync("Tarjeta/" + tarjeta.id).Result;

                    if (respuesta.IsSuccessStatusCode)
                    {
                        var resp = respuesta.Content.ReadAsStringAsync().Result;
                        if (resp != null)
                        {
                            var tarjetas = JsonConvert.DeserializeObject<List<Tarjeta>>(resp.ToString());
                            var tar = (T)Convert.ChangeType(tarjetas[0], typeof(T));
                            return tar;

                        }
                        return default;
                    }
                    else
                    {
                        return default;
                    }

                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public override void Update(BaseEntity entity)
        {
            try
            {
                Tarjeta tarjeta = (Tarjeta)entity;
                using (var client = new HttpClient())
                {
                    client.BaseAddress = new Uri(baseUrl);
                    client.DefaultRequestHeaders.Accept.Clear();
                    client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    HttpContent content = new StringContent(JsonConvert.SerializeObject(tarjeta), Encoding.UTF8, "application/json");
                    HttpResponseMessage respuesta = client.PutAsync("Tarjeta/" + tarjeta.id, content).Result;

                    if (respuesta.IsSuccessStatusCode)
                    {


                    }
                    else
                    {

                    }

                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
