using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using System.Transactions;

namespace Entities
{
    public class Tarjeta : BaseEntity
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

        public Tarjeta() { }
        public Tarjeta(string id, string tipo, string entidadBancaria, string fechaCorte, string idUsuario)
        {
            
            this.id = id;
            Tipo = tipo;
            EntidadBancaria = entidadBancaria;
            FechaCorte = fechaCorte;
            IdUsuario = idUsuario;
        }



    
    }
}
