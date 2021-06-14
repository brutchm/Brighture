using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class Usuario:BaseEntity
    {
        [JsonPropertyName("id")]
        public string Id { get; set; }

        [JsonPropertyName("nombre")]
        public string Nombre { get; set; }

        [JsonPropertyName("apellidoUno")]
        public string ApellidoUno { get; set; }


        [JsonPropertyName("apellidoDos")]
        public string ApellidoDos { get; set; }

        [JsonPropertyName("fechaNacimiento")]
        public string FechaNacimiento { get; set; }

        [JsonPropertyName("correoElectronico")]
        public string CorreoElectronico { get; set; }

        [JsonPropertyName("contrasenna")]
        public string Contrasenna { get; set; }

        public Usuario() { }
    
    }
}
