using System;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Models
{
    public class Usuario
    {
        [JsonPropertyName("id")]
        public string id { get; set; }

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

        public Usuario()
        {
        }

        public Usuario(string id, string nombre, string apellidoUno, string apellidoDos, string fechaNacimiento, string correoElectronico, string contrasenna)
        {
            this.id = id;
            this.Nombre = nombre;
            this.ApellidoUno = apellidoUno;
            this.ApellidoDos = apellidoDos;
            this.FechaNacimiento = fechaNacimiento;
            this.CorreoElectronico = correoElectronico;
            this.Contrasenna = contrasenna;
        }

    }
}
