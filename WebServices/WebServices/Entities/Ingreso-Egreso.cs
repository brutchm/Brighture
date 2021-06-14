using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Ingreso_Egreso:BaseEntity
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("tipo")]
        public string Tipo { get; set; }

        [JsonPropertyName("valor")]
        public string Valor { get; set; }

        [JsonPropertyName("categoria")]
        public string Categoria { get; set; }

        [JsonPropertyName("fecha")]
        public string Fecha { get; set; }

        [JsonPropertyName("metodoPago")]
        public string MetodoPago { get; set; }

        [JsonPropertyName("tarjeta")]
        public string Tarjeta { get; set; }

        [JsonPropertyName("idUsuario")]
        public string Usuario { get; set; }


        public Ingreso_Egreso() { }


    }
}
