using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace Entities
{
    public class TransaccionGrafico: BaseEntity
    {
        [JsonPropertyName("valor")]
        public double Valor { get; set; }

        [JsonPropertyName("categoria")]
        public string Categoria { get; set; }

        public TransaccionGrafico() { }

    }
}
