using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entities;
using LogicCoreApi;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Ingreso_EgresoController : ControllerBase
    {
        private IngresoEgresoManager manager = new IngresoEgresoManager();

        // GET: api/Ingreso_Egreso
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(manager.RetriveAll());
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurri? un problema al obtener datos" });
            }
        }

        // GET: api/Ingreso_Egreso/5
        [HttpGet("{id}")]
        public ActionResult Get(string id)
        {
            Ingreso_Egreso item = new Ingreso_Egreso
            {
                Id = id
            };

            try
            {
                return Ok(manager.RetriveById(item));
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurri? un problema al obtener dato" });
            }


        }

        [HttpGet("ByUserId/{idUsuario}")]
        public ActionResult GetByUserId(string idUsuario)
        {
            Usuario usr = new Usuario();
            usr.Id = idUsuario;
            return Ok(manager.RetriveAllById(usr));
        }

        [HttpGet("{idUsuario}/{fecha}")]
        public ActionResult GetByUserId(string idUsuario, string fecha)
        {
           

            try
            {
                Ingreso_Egreso transaccion = new Ingreso_Egreso
                {
                    Usuario = idUsuario,
                    Fecha = fecha
                };

                return Ok(manager.RetriveAllGrafico(transaccion));
            }
            catch(Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurrió un problema al obtener egresos" });
            }
           
        }


        // POST: api/Ingreso_Egreso
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Ingreso_Egreso item)
        {

            try
            {
                manager.Create(item);
                return Ok(new { msg = "El dato ha sido agregado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurri? un problema al agregar dato" });
            }

        }

        // PUT: api/Ingreso_Egreso/5
        [HttpPut("{id}")]
        public ActionResult Put([FromBody] Ingreso_Egreso item)
        {
            
            try
            {
                manager.Update(item);
                return Ok(new { msg = "El dato ha sido modificado correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurri? un problema al modificar dato" });
            }
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            Ingreso_Egreso item = new Ingreso_Egreso
            {
                Id = id
            };
   
            try
            {
                manager.Delete(item);
                return Ok(new { msg = "El dato ha sido eliminada correctamente" });
            }
            catch (Exception ex)
            {
                return StatusCode(401, new { msg = "Ocurri? un problema al eliminar dato" });
            }


        }
    }
}
