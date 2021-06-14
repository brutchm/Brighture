using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using LogicCoreApi;
using Microsoft.AspNetCore.Mvc;
using RouteAttribute = Microsoft.AspNetCore.Mvc.RouteAttribute;
using Entities;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TarjetaController : ControllerBase
    {

        TarjetasManager mng;

        // GET: <TarjetaController>
       
        [HttpGet]
        public ActionResult Get()
        {
            mng = new TarjetasManager();
            try
            {
                
                return Ok(mng.Retrieve());
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurrió un problema al obtener tarjetas" });
            }
                       
        }

        // GET <TarjetaController>/5

        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {

            TarjetasManager mng = new TarjetasManager();
            Tarjeta tar = new Tarjeta
            {
                id = id,
            };
            try
            {
                
                return Ok(mng.RetrieveById(tar));
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurrió un problema al obtener tarjeta" });
            }

            
        }


        [HttpGet("CardsByUserId/{idus}")]
        public ActionResult GetTarjetas(string idus)
        {

            TarjetasManager mng = new TarjetasManager();
            Tarjeta tar = new Tarjeta
            {
                IdUsuario = idus,
            };
            
            try
            {
                return Ok(mng.RetrieveAllById(tar));
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurrió un problema al obtener tarjetas" });
            }
        }

        // POST <TarjetaController>
        [HttpPost]
        public ActionResult Post(Tarjeta pobjeto)
        {
            TarjetasManager mng = new TarjetasManager();
            Tarjeta tar = new Tarjeta
            {
                id = pobjeto.id,
                Tipo = pobjeto.Tipo,
                EntidadBancaria = pobjeto.EntidadBancaria,
                FechaCorte = pobjeto.FechaCorte,
                 IdUsuario = pobjeto.IdUsuario
            };
                     
            
            try
            {
                mng.Create(tar);
                return Ok(new { msg = "La tarjeta ha sido agregada correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurrió un problema al agregar tarjeta" });
            }
        }

        // PUT <TarjetaController>/5


        [HttpPut]
        public ActionResult Put(Tarjeta pobjeto)
        {
            TarjetasManager mng = new TarjetasManager();
            Tarjeta tar = new Tarjeta
            {
                id = pobjeto.id,
                Tipo = pobjeto.Tipo,
                EntidadBancaria = pobjeto.EntidadBancaria,
                FechaCorte = pobjeto.FechaCorte,
                IdUsuario = pobjeto.IdUsuario
            };


            try
            {
                mng.Update(tar);
                return Ok(new { msg = "La tarjeta ha sido modificada correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurrió un problema al modificar tarjeta" });
            }
        }

        // DELETE <TarjetaController>/5

        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            TarjetasManager mng = new TarjetasManager();
            Tarjeta tar = new Tarjeta
            {
                id = id                 
            };

            try
            {
                mng.Delete(tar);
                return Ok(new { msg = "La tarjeta ha sido eliminada correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurrió un problema al eliminar tarjeta" });
            }
        }
    }
}
