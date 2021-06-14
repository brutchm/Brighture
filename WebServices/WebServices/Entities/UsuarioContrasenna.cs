using System;
using System.Text.Json.Serialization;

namespace Entities
{
    public class UsuarioContrasenna:Usuario
    {

        [JsonPropertyName("nuevaContrasenna")]
        public string NuevaContrasenna { get; set; }

        [JsonPropertyName("validacionContrasenna")]
        public string ValidacionContrasenna { get; set; }

        public UsuarioContrasenna(){ }
        
    }
}
