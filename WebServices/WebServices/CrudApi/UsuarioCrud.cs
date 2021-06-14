using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using Entities;
using Newtonsoft.Json;

namespace CrudApi
{
    public class UsuarioCrud : BaseCrud
    {
        private string baseUrl = "https://brighturedataaccess.azurewebsites.net/api/";   
        //private string baseUrl = "https://localhost:5001/api/";

        public UsuarioCrud()
        {
        }

        public override async void CreateAsync(BaseEntity entity)
        {
            var usuario = (Usuario)entity;
            var json = JsonConvert.SerializeObject(usuario);
            var data = new StringContent(json, Encoding.UTF8, "application/json");

            var url = baseUrl + "Usuario";
            using var client = new HttpClient();

            var response = await client.PostAsync(url, data);

            string result = response.Content.ReadAsStringAsync().Result;
        }

        public override void Delete(BaseEntity entity)
        {
            using (var client = new HttpClient())
            {
                Usuario usuario = (Usuario)entity;
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage respuesta = client.DeleteAsync("Usuario/" + usuario.Id).Result;

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
                HttpResponseMessage respuesta = client.GetAsync("Usuario").Result;

                if (respuesta.IsSuccessStatusCode)
                {
                    var resp = respuesta.Content.ReadAsStringAsync().Result;
                    if (resp != null)
                    {
                        List<T> listaUsuarios = new List<T>();
                        var usuarios = JsonConvert.DeserializeObject<List<Usuario>>(resp.ToString());
                        foreach (var usr in usuarios)
                        {
                            listaUsuarios.Add((T)Convert.ChangeType(usr, typeof(T)));
                        }
                        return listaUsuarios;
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
            throw new NotImplementedException();
        }

        public override T RetrieveById<T>(BaseEntity entity)
        {
            Usuario usuario = (Usuario)entity;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpResponseMessage respuesta = client.GetAsync("Usuario/" + usuario.Id).Result;

                if (respuesta.IsSuccessStatusCode)
                {
                    var resp = respuesta.Content.ReadAsStringAsync().Result;
                    if (resp != null)
                    {
                        var usuarios = JsonConvert.DeserializeObject<List<Usuario>>(resp.ToString());
                        var user = (T)Convert.ChangeType(usuarios[0], typeof(T));
                        return user;

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
            Usuario usuario = (Usuario)entity;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                client.DefaultRequestHeaders.Accept.Clear();
                client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                HttpContent content = new StringContent(JsonConvert.SerializeObject(usuario), Encoding.UTF8, "application/json");
                HttpResponseMessage respuesta = client.PutAsync("Usuario/" + usuario.Id, content).Result;

                if (!respuesta.IsSuccessStatusCode)
                {
                    Exception exc = new Exception();
                    throw exc;
                }
            }
        }
    }
}
