using System;
using System.Text.Json.Serialization;

namespace DataAccessLayer.Models
{
    public class Ingreso_Egreso
    {
        [JsonPropertyName("id")]
        public string id { get; set; }

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

        [JsonPropertyName("usuario")]
        public string Usuario { get; set; }


        public Ingreso_Egreso()
        {
        }

        public Ingreso_Egreso(string id, string tipo, string valor, string categoria, string fecha, string metodoPago, string tarjeta, string usuario)
        {
            this.id = id;
            this.Tipo = tipo;
            this.Valor = valor;
            this.Categoria = categoria;
            this.Fecha = fecha;
            this.MetodoPago = metodoPago;
            this.Tarjeta = tarjeta;
            this.Usuario = usuario;
        }

        public Ingreso_Egreso(string id, string tipo, string valor, string categoria, string fecha, string metodoPago, string usuario)
        {
            this.id = id;
            this.Tipo = tipo;
            this.Valor = valor;
            this.Categoria = categoria;
            this.Fecha = fecha;
            this.MetodoPago = metodoPago;
            this.Usuario = usuario;
        }

    }
}
