using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Entities;
using LogicCoreApi;

using Microsoft.AspNetCore.Mvc;


namespace WebAPI.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {


        private UsuarioManager um = new UsuarioManager();


        // GET: api/Usuario
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(um.RetrieveAll());
        }

        // GET: api/Usuario/5
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            Usuario usr = new Usuario
            {
                Id = id,
            };

            return Ok(um.RetrieveById(usr));
        }

        // POST: api/Usuario
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Usuario item)
        { 
            um.Create(item);
            return Ok();
        }

        // PUT: api/Usuario/JSON
        [HttpPut]
        public ActionResult Put([FromBody] Usuario item)
        {
            um.Update(item);
            return Ok();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(String id)
        {
            Usuario usuario = new Usuario
            {
                Id = id
            };
            um.Delete(usuario);
            return Ok();
        }

        //GET: api/Usuario/LogIn
        [HttpGet("LogIn/{correoElectronico}/{contrasenna}")]
        public ActionResult LogIn(string correoElectronico, string contrasenna)
        {
            Usuario item = new Usuario { CorreoElectronico = correoElectronico, Contrasenna = contrasenna };

            Usuario user = um.AuthenticateLogIn(item);
            if (user == null)
            {
                return StatusCode(401, new { msg = "Operación no autorizada" });
            }
            user.Contrasenna = null;
            return Ok(user);
        }

        [HttpPut("UpdatePassword")]
        public ActionResult RecoverPassword([FromBody] UsuarioContrasenna usuario)
        {
            Usuario user = new Usuario { Id = usuario.Id };
            if(um.RetrieveById(user) != null && usuario.NuevaContrasenna== usuario.ValidacionContrasenna)
            {
                user = um.RetrieveById(user);
                user.Contrasenna = usuario.NuevaContrasenna;
                um.Update(user);
                return Ok();
            }
            return StatusCode(401, new { msg = "Operación no autorizada" });
            }

        [HttpGet("RecuperarContrasenna/{mail}")]
        public async Task<ActionResult> RecuperarContrasennaAsync(string mail)
        {
            
            List<Usuario> usuarios = um.RetrieveAll();
            foreach (var user in usuarios)
            {
                if (user.CorreoElectronico == mail)
                {
                    _ = UsuarioManager.EnviarMail(user);
                    return Ok(new { msg = "Se envió la contraseña al correo" });
                }
            }
            return StatusCode(401, new { msg = "Operación no autorizada" });
        }

        [HttpDelete("EliminarCuenta")]
        public ActionResult EliminarCuenta([FromBody]Usuario user)
        {
            if(um.EliminarCuenta(user))
            {
                return Ok(new { msg = "Su cuenta ha sido eliminada correctamente" });
            }
            return StatusCode(401, new { msg = "Operación no autorizada" });
        }
    }
}
