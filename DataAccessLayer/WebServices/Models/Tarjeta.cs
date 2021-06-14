using System;
using System.Text.Json.Serialization;

namespace WebServices.Models
{
    public class Tarjeta
    {
        [JsonPropertyName("id")]
        public string id { get; set; }

        [JsonPropertyName("tipo")]
        public string Tipo { get; set; }

        [JsonPropertyName("entidadBancaria")]
        public string EntidadBancaria { get; set; }

        [JsonPropertyName("fechaCorte")]
        public string FechaCorte { get; set; }

        [JsonPropertyName("idUsuario")]
        public string IdUsuario { get; set; }



        public Tarjeta(){ }

        public Tarjeta(string tipo, string entidadBancaria, string fechaCorte, string idUsuario)
        {
            this.Tipo = tipo;
            this.EntidadBancaria = entidadBancaria;
            this.FechaCorte = fechaCorte;
            this.IdUsuario = idUsuario;
        }
    }
}
