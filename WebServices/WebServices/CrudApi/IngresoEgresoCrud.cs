using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Entities;
using Newtonsoft.Json;

namespace CrudApi
{
    public class IngresoEgresoCrud : BaseCrud
    {

        //private string baseUrl = "https://localhost:5001/api/";
        private string baseUrl = "https://brighturedataaccess.azurewebsites.net/api/";   

        public IngresoEgresoCrud(){}

        public override async void CreateAsync(BaseEntity entity)
        {
            var item = (Ingreso_Egreso)entity;
            var json = JsonConvert.SerializeObject(item);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var url = baseUrl + "Ingreso_Egreso";
            using var client = new HttpClient();

            var response = await client.PostAsync(url, data);

            string result = response.Content.ReadAsStringAsync().Result;
        }

        public override void Delete(BaseEntity entity)
        {
            using (var client = new HttpClient())
            {
                Ingreso_Egreso item = (Ingreso_Egreso)entity;
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage respuesta = client.DeleteAsync("Ingreso_Egreso/" + item.Id).Result;

                if (!respuesta.IsSuccessStatusCode)
                {
                    Exception exc = new Exception();
                    throw exc;
                }
            }
        }

        public override List<T> Retrieve<T>()
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage respuesta = client.GetAsync("Ingreso_Egreso").Result;

                if (respuesta.IsSuccessStatusCode)
                {
                    var resp = respuesta.Content.ReadAsStringAsync().Result;
                    if (resp != null)
                    {
                        List<T> listaItems = new List<T>();
                        var usuarios = JsonConvert.DeserializeObject<List<Ingreso_Egreso>>(resp.ToString());
                        foreach (var itm in usuarios)
                        {
                            listaItems.Add((T)Convert.ChangeType(itm, typeof(T)));
                        }
                        return listaItems;
                    }
                }
                else
                {
                    var exc = new Exception();
                    throw exc;
                }
                return null;

            }
        }

        public override List<T> RetrieveAllById<T>(BaseEntity entity)
        {
            List<Ingreso_Egreso> lstItems = Retrieve<Ingreso_Egreso>();
            Usuario user = (Usuario)entity;
            List<T> returnable = new List<T>();

            foreach(var data in lstItems)
            {
                if(data.Usuario==user.Id)
                {
                    returnable.Add((T)Convert.ChangeType(data, typeof(T)));
                }
            }
            returnable.Reverse();
            return returnable;
        }

        public override T RetrieveById<T>(BaseEntity entity)
        {
            Ingreso_Egreso item = (Ingreso_Egreso)entity;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage respuesta = client.GetAsync("Ingreso_Egreso/" + item.Id).Result;

                if (respuesta.IsSuccessStatusCode)
                {
                    var resp = respuesta.Content.ReadAsStringAsync().Result;
                    if (resp != null)
                    {
                        var desitms = JsonConvert.DeserializeObject<List<Ingreso_Egreso>>(resp.ToString());
                        var itm = (T)Convert.ChangeType(desitms[0], typeof(T));
                        return itm;

                    }
                    return default;
                }
                else
                {
                    var exc = new Exception();

                    throw exc;
                }

            }
        }

        public override void Update(BaseEntity entity)
        {
            Ingreso_Egreso item = (Ingreso_Egreso)entity;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpContent content = new StringContent(JsonConvert.SerializeObject(item), Encoding.UTF8, "application/json");
                HttpResponseMessage respuesta = client.PutAsync("Ingreso_Egreso/" + item.Id, content).Result;

                if (!respuesta.IsSuccessStatusCode)
                {
                    Exception exc = new Exception();
                    throw exc;
                }
            }
        }
    }
}
